

type CssToken = {
    type: "string" | "identifer" | "char",
    start: number,
    end: number
}

type CssAstNode = {
    type: "rulelist"
    start: number,
    end: number

    rules: CssAstNode[]
} | {
    type: "rule";
    start: number;
    end: number;
    selector: { start: number; end: number; };
    block: CssAstNode;
} | {
    type: "decl"
    start: number,
    end: number

    property: { start: number, end: number },
    value: { start: number, end: number },
} | {
    type: "comment"
    start: number,
    end: number
} | {
    type: "unknown";
    start: number;
    end: number;
}


function tokenizeCss(src: string): CssToken[] {
    const toks: CssToken[] = [];

    const isWhitespace = (c: string) => /\s/.test(c);
    const isIdentifierStart = (c: string) => /[a-zA-Z_\-#.]/.test(c);

    let i = 0
    let start = 0
    while (i < src.length) {
        start = i
        const c = src[i];

        if (isWhitespace(c)) {
            i++
            continue;
        }

        if (c === '\"' || c === '\'') {
            const openChar = c
            do {
                i++
                if (src[i] == "\\") i++
            } while (src[i] && src[i] != openChar && src[i] != "\n")
            i++
            toks.push({ type: "string", start: start, end: i });
            continue;
        }

        if (isIdentifierStart(c)) {
            i++
            while (/[a-zA-Z_\-#.0-9]/.test(src[i])) {
                i++
            }
            toks.push({ type: "identifer", start, end: i });
            continue;
        }

        toks.push({ type: "char", start: i, end: i + 1 });
        i++
    }
    return toks;
}


export function parseCss(src: string) {
    const tokens = tokenizeCss(src)

    const tree: CssAstNode = { type: "rulelist", start: 0, end: src.length, rules: [] }

    let current = 0

    while (current < tokens.length) {
        let decl = parseDecl()
        if (decl) {
            // error
            tree.rules.push(decl)
            continue
        }

        let cmt = parseComment()
        if (cmt) {
            tree.rules.push(cmt)
            continue
        }

        let rule = parseRule()
        if (rule) {
            tree.rules.push(rule)
            continue
        }

        tree.rules.push({ type: "unknown", start: tokens[current].start, end: tokens[current].end })
        current++
    }

    function parseBlock(): CssAstNode | null {
        if (!tokens[current]) return null
        let mark = current
        let start = tokens[current].start

        const nodes: CssAstNode[] = []

        if (!isChar(tokens[current++], "{")) {
            current = mark
            return null
        }

        while (tokens[current] && !isChar(tokens[current], "}")) {
            let decl = parseDecl()
            if (decl) {
                nodes.push(decl)
                continue
            }

            let cmt = parseComment()
            if (cmt) {
                nodes.push(cmt)
                continue
            }

            let rule = parseRule()
            if (rule) {
                nodes.push(rule)
                continue
            }
            current++
        }

        if (!isChar(tokens[current++], "}")) {
            current = mark
            return null
        }
        return { type: "rulelist", start, end: tokens[current - 1].end, rules: nodes }
    }

    function parseComment(): CssAstNode | null {
        if (!tokens[current]) return null
        let start = tokens[current].start
        let i = current

        if (!isChar(tokens[i++], "/") || !isChar(tokens[i++], "*")) {
            return null
        }

        while (tokens[i]) {
            if (tokens[i + 1] &&
                isChar(tokens[i], "*") &&
                isChar(tokens[i + 1], "/")
            ) {
                break
            }
            i++
        }
        i++

        current = i + 1
        return { type: "comment", start, end: tokens[i].end }
    }

    function parseDecl(): CssAstNode | null {
        if (!tokens[current]) return null
        let start = tokens[current].start
        let i = current

        let value: { start: number, end: number }

        let property = { start: tokens[i].start, end: tokens[i].end }
        if (tokens[i].type == "identifer") {
            property.end = tokens[i].end
        } else {
            return null
        }
        i++
        if (!isChar(tokens[i++], ":")) {
            return null
        }
        value = { start: tokens[i].start, end: tokens[i].end }
        while (tokens[i] && !isChar(tokens[i], ";") && !isChar(tokens[i], "}")) {
            if (isChar(tokens[i], "{")) return null
            i++
        }
        value.end = tokens[i - 1].end

        if (!isChar(tokens[i], ";")) i--

        current = i + 1
        return { type: "decl", start, end: tokens[i].end, property, value }
    }

    function parseRule(): CssAstNode | null {
        if (!tokens[current]) return null
        let mark = current
        let start = tokens[current].start

        let selector = { start, end: start }

        while (tokens[current] && !isChar(tokens[current], "{")) {
            if (isChar(tokens[current], "}")) {
                current = mark
                return null
            }
            current++
        }
        selector.end = tokens[current - 1].end

        const block = parseBlock()
        if (!block) {
            current = mark
            return null
        }

        return { type: "rule", start, end: tokens[current - 1].end, selector, block }
    }

    function isChar(token: CssToken, char: string) {
        return token && token.type == "char" && src[token.start] == char
    }

    function addText(obj: any) {
        if (obj && typeof obj == "object") {
            if (obj.start !== undefined && obj.end !== undefined) {
                obj.str = src.slice(obj.start, obj.end)
            }
            for (const i in obj) {
                addText(obj[i])
            }
        }
    }
    // addText(tree)

    return tree
}