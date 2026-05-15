const CHAR = {
    NUL: 0,                // Null
    SOH: 1,                // Start of Heading
    STX: 2,                // Start of Text
    ETX: 3,                // End of Text
    EOT: 4,                // End of Transmission
    ENQ: 5,                // Enquiry
    ACK: 6,                // Acknowledge
    BEL: 7,                // Bell
    BS: 8,                 // Backspace
    HTAB: 9,               // Horizontal Tab
    LF: 10,                // Line Feed
    VTAB: 11,              // Vertical Tab
    FF: 12,                // Form Feed
    CR: 13,                // Carriage Return
    SO: 14,                // Shift Out
    SI: 15,                // Shift In
    DLE: 16,               // Data Link Escape
    DC1: 17,               // Device Control 1
    DC2: 18,               // Device Control 2
    DC3: 19,               // Device Control 3
    DC4: 20,               // Device Control 4
    NAK: 21,               // Negative Acknowledge
    SYN: 22,               // Synchronous Idle
    ETB: 23,               // End of Trans. Block
    CAN: 24,               // Cancel
    EM: 25,                // End of Medium
    SUB: 26,               // Substitute
    ESC: 27,               // Escape
    FS: 28,                // File Separator
    GS: 29,                // Group Separator
    RS: 30,                // Record Separator
    US: 31,                // Unit Separator
    SPACE: 32,             //
    EXCLAMATION: 33,       // !
    DOUBLE_QUOTE: 34,      // "
    HASH: 35,              // #
    DOLLAR: 36,            // $
    PERCENT: 37,           // %
    AMPERSAND: 38,         // &
    SINGLE_QUOTE: 39,      // '
    LEFT_PAREN: 40,        // (
    RIGHT_PAREN: 41,       // )
    ASTERISK: 42,          // *
    PLUS: 43,              // +
    COMMA: 44,             // ,
    MINUS: 45,             // -
    PERIOD: 46,            // .
    SLASH: 47,             // /
    0: 48,                 // 0
    1: 49,                 // 1
    2: 50,                 // 2
    3: 51,                 // 3
    4: 52,                 // 4
    5: 53,                 // 5
    6: 54,                 // 6
    7: 55,                 // 7
    8: 56,                 // 8
    9: 57,                 // 9
    COLON: 58,             // :
    SEMICOLON: 59,         // ;
    LESS: 60,              // <
    EQUALS: 61,            // =
    GREATER: 62,           // >
    QUESTION: 63,          // ?
    At: 64,                // @
    A: 65,                 // A
    B: 66,                 // B
    C: 67,                 // C
    D: 68,                 // D
    E: 69,                 // E
    F: 70,                 // F
    G: 71,                 // G
    H: 72,                 // H
    I: 73,                 // I
    J: 74,                 // J
    K: 75,                 // K
    L: 76,                 // L
    M: 77,                 // M
    N: 78,                 // N
    O: 79,                 // O
    P: 80,                 // P
    Q: 81,                 // Q
    R: 82,                 // R
    S: 83,                 // S
    T: 84,                 // T
    U: 85,                 // U
    V: 86,                 // V
    W: 87,                 // W
    X: 88,                 // X
    Y: 89,                 // Y
    Z: 90,                 // Z
    LEFT_BRACKET: 91,      // [
    BACKSLASH: 92,         // \
    RIGHT_BRACKET: 93,     // ]
    CARET: 94,             // ^
    UNDERSCORE: 95,        // _
    GRAVE_ACCENT: 96,      // `
    a: 97,                 // a
    b: 98,                 // b
    c: 99,                 // c
    d: 100,                // d
    e: 101,                // e
    f: 102,                // f
    g: 103,                // g
    h: 104,                // h
    i: 105,                // i
    j: 106,                // j
    k: 107,                // k
    l: 108,                // l
    m: 109,                // m
    n: 110,                // n
    o: 111,                // o
    p: 112,                // p
    q: 113,                // q
    r: 114,                // r
    s: 115,                // s
    t: 116,                // t
    u: 117,                // u
    v: 118,                // v
    w: 119,                // w
    x: 120,                // x
    y: 121,                // y
    z: 122,                // z
    LEFT_BRACE: 123,       // {
    VERTICAL_BAR: 124,     // |
    RIGHT_BRACE: 125,      // }
    TILDE: 126,            // ~
    DEL: 127,              // (Delete)
}

type Loc = {
    start: number;
    end: number;
}

interface CssNodeBase {
    type: string;
    loc: Loc;
}

export interface CssToken extends CssNodeBase {
    type: "token";
    kind: "id" | "str" | "num" | "char" | "comment";
}

export interface CssRule extends CssNodeBase {
    type: "rule";
    prelude: CssToken[];
    block: CssNode[];
}

export interface CssDeclaration extends CssNodeBase {
    type: "decl";
    property: CssToken;
    value: CssToken[];
    // important: boolean;
}


export type CssNode = CssToken | CssRule | CssDeclaration;

const CH_A = "A".charCodeAt(0)
const CH_Z = "Z".charCodeAt(0)
const CH_a = "a".charCodeAt(0)
const CH_z = "z".charCodeAt(0)
const CH_0 = "0".charCodeAt(0)
const CH_9 = "9".charCodeAt(0)
const CH_plus = "+".charCodeAt(0)
const CH_minus = "-".charCodeAt(0)
const CH_hash = "#".charCodeAt(0)
const CH__ = "_".charCodeAt(0)
const CH_dot = ".".charCodeAt(0)
const CH_slash = "/".charCodeAt(0)
const CH_backslash = "\\".charCodeAt(0)
const CH_quote = "\"".charCodeAt(0)
const CH_singe_quote = "'".charCodeAt(0)
const CH_star = "*".charCodeAt(0)

const CH_brace_open = "{".charCodeAt(0)
const CH_brace_close = "}".charCodeAt(0)
const CH_semicolon = ";".charCodeAt(0)
const CH_colon = ":".charCodeAt(0)

const CH_carriage = "\r".charCodeAt(0)
const CH_linefeed = "\n".charCodeAt(0)
const CH_tab = "\t".charCodeAt(0)
const CH_vertical_space = "\v".charCodeAt(0)
const CH_space = " ".charCodeAt(0)

const isIdentifierCode = (c: number, numbers: boolean) =>
    (CH_a <= c && c <= CH_z)
    || (CH_A <= c && c <= CH_Z)
    || ((CH_0 <= c && c <= CH_9) && numbers)
    || c == CH_minus
    || c == CH_hash
    || c == CH__

const isWhitespaceCode = (c: number) =>
    c == CHAR.CR
    || c == CHAR.LF
    || c == CHAR.HTAB
    || c == CH_vertical_space
    || c == CHAR.SPACE

const isNumberCode = (c: number) => (CHAR[0] <= c && c <= CHAR[9])
const isNumberStartCode = (c: number) => (CH_0 <= c && c <= CH_9) || c == CH_plus || c == CH_minus

export function tokenizeCss(src: string): CssToken[] {
    const toks: CssToken[] = [];

    let i = 0
    while (i < src.length) {
        const start = i
        const code = src.charCodeAt(i)

        if (isWhitespaceCode(code)) {
            i++
            continue;
        }

        if (isIdentifierCode(code, false)) {
            i++
            while (isIdentifierCode(src.charCodeAt(i), true)) {
                i++
            }
            toks.push({ type: "token", kind: "id", loc: { start, end: i } });
            continue;
        }

        if (isNumberStartCode(code)) {
            i++
            while (isNumberCode(src.charCodeAt(i))) {
                i++
            }
            if (src.charCodeAt(i) == CH_dot && isNumberCode(src.charCodeAt(i + 1))) {
                i++
                while (isNumberCode(src.charCodeAt(i))) {
                    i++
                }
            }

            toks.push({ type: "token", kind: "num", loc: { start, end: i } });
            continue;
        }


        if (code === CH_quote || code === CH_singe_quote) {
            const openChar = code
            do {
                i++
                if (src.charCodeAt(i) == CH_backslash) i++
            } while (i < src.length && src.charCodeAt(i) != openChar && src.charCodeAt(i) != CH_linefeed)
            i++
            toks.push({ type: "token", kind: "str", loc: { start: start, end: i } });
            continue;
        }

        if (code == CH_slash && src.charCodeAt(i + 1) == CH_star) {
            i += 2
            while (i < src.length && !(src.charCodeAt(i) == CH_star && src.charCodeAt(i + 1) == CH_slash)) {
                i++
            }
            i += 2
            toks.push({ type: "token", kind: "comment", loc: { start: start, end: i } });
            continue;
        }


        toks.push({ type: "token", kind: "char", loc: { start: i, end: i + 1 } });
        i++
    }
    return toks;
}

interface Parser {
    src: string
    tokens: CssToken[]
    out: CssNode[]
    current: number
}

export function parseCss(src: string, toks?: CssToken[]) {
    // console.time("tokenize")
    const tokens = toks ?? tokenizeCss(src)
    // console.timeEnd("tokenize")

    // for (const t of tokens) {
    //     console.log(src.slice(t.loc.start, t.loc.end), t.kind);
    // }

    const parser: Parser = {
        src,
        tokens,
        out: [],
        current: 0
    }


    let current = 0

    const timings: Record<string, number> = {}

    function timed<T, R>(fn: (...args: T[]) => R, ...args: T[]): R {
        const t0 = performance.now()
        let res = fn(...args)
        timings[fn.name] ??= 0
        timings[fn.name] += performance.now() - t0
        return res
    }

    const stylesheet = parseNodeList(parser)

    return stylesheet
}


function peekToken(parser: Parser) {
    return parser.current < parser.tokens.length && parser.tokens[parser.current].kind == "char"
}

function peekTokenKind(parser: Parser, kind: CssToken["kind"]) {
    return parser.current < parser.tokens.length && parser.tokens[parser.current].kind == kind
}

function peekChar(parser: Parser, ch: string) {
    return parser.current < parser.tokens.length && parser.src[parser.tokens[parser.current].loc.start] == ch
}

function peekCharCode(parser: Parser, ch: number) {
    return parser.current < parser.tokens.length && parser.src.charCodeAt(parser.tokens[parser.current].loc.start) == ch
}

function peekCharOffset(parser: Parser, ch: string, offset: number) {
    return parser.current + offset < parser.tokens.length && parser.src[parser.tokens[parser.current + offset].loc.start] == ch
}

function advanceToken(parser: Parser) {
    return parser.current < parser.tokens.length ? parser.tokens[parser.current++] : null
}

function expectTokenKind(parser: Parser, kind: CssToken["kind"]) {
    return parser.current < parser.tokens.length && parser.tokens[parser.current++].kind == kind
}

function expectCharr(parser: Parser, ch: string) {
    return parser.current < parser.tokens.length && parser.src[parser.tokens[parser.current++].loc.start] == ch
}

function expectCharCode(parser: Parser, ch: number) {
    return parser.current < parser.tokens.length && parser.src.charCodeAt(parser.tokens[parser.current++].loc.start) == ch
}

function makeLoc(parser: Parser, start: CssToken, end: CssToken): Loc {
    return { start: start.loc.start, end: end.loc.end }
}

function makeLocFromStart(parser: Parser, start: number): Loc {
    return { start: parser.tokens[start].loc.start, end: parser.tokens[parser.current - 1].loc.end }
}

const timings: Record<string, number> = {}
const timings_count: Record<string, number> = {}
const timings_total: Record<string, number> = {}

function pushTiming(name: string, start: number) {
    const t1 = performance.now()
    if (!timings[name]) {
        timings_total[name] = 0
        timings_count[name] = 0
        timings[name] = 0
    }
    timings_total[name] += t1 - start
    timings_count[name] += 1
    timings[name] = timings_total[name] / timings_count[name]
}

setTimeout(() => {
    console.table(timings);
    console.table(timings_total);
    console.table(timings_count);
}, 500);

function parseNodeList(p: Parser) {
    const nodes: CssNode[] = []

    while (p.current < p.tokens.length && !peekCharCode(p, CH_brace_close)) {
        const t0 = performance.now()

        if (peekTokenKind(p, "comment")) {
            // pushTiming("comment", t0)
            nodes.push(p.tokens[p.current++])
            continue
        }

        let decl = parseDecl(p)
        if (decl) {
            // pushTiming("decl", t0)
            // TODO: this should be an error when not in rule
            nodes.push(decl)
            continue
        }

        let rule = parseRule(p)
        if (rule) {
            // pushTiming("rule", t0)
            nodes.push(rule)
            continue
        }

        nodes.push(p.tokens[p.current])
        p.current++
    }
    return nodes
}

function parseDecl(p: Parser): CssDeclaration | null {
    let mark = p.current

    if (!peekTokenKind(p, "id")) {
        p.current = mark
        return null
    }
    let property = advanceToken(p)!

    if (!expectCharCode(p, CH_colon)) {
        p.current = mark
        return null
    }


    const valueStart = p.current;
    while (p.current < p.tokens.length && !peekCharCode(p, CH_semicolon) && !peekCharCode(p, CH_brace_close)) {
        if (peekCharCode(p, CH_brace_open)) {
            p.current = mark
            return null
        }
        p.current++
    }
    let value = p.tokens.slice(valueStart, p.current);


    if (!peekCharCode(p, CH_semicolon)) p.current--

    p.current = p.current + 1
    return { type: "decl", property, value, loc: makeLocFromStart(p, mark) }
}

function parseRule(p: Parser): CssRule | null {
    let mark = p.current

    let prelude: CssToken[] = []

    while (p.current < p.tokens.length && !peekCharCode(p, CH_brace_open)) {
        if (peekCharCode(p, CH_brace_close)) {
            p.current = mark
            return null
        }
        prelude.push(p.tokens[p.current++])
    }

    const block = parseBlock(p)
    if (!block) {
        p.current = mark
        return null
    }

    return { type: "rule", prelude, block, loc: makeLocFromStart(p, mark) }
}


function parseBlock(p: Parser): CssNode[] | null {
    let mark = p.current


    if (!expectCharCode(p, CH_brace_open)) {
        p.current = mark
        return null
    }

    const children = parseNodeList(p)

    if (p.current < p.tokens.length && !expectCharCode(p, CH_brace_close)) { // dont expect } when eof
        p.current = mark
        return null
    }
    return children
}

export function cssNodeListToString(nodes: CssNode[], src: string) {
    return nodes.map(node => cssNodeToString(node, src)).join("")
}

export function cssNodeToString(node: CssNode, src: string): string {
    switch (node.type) {
        case "token":
            return src.slice(node.loc.start, node.loc.end)
        case "rule":
            if (node.block)
                return cssNodeListToString(node.prelude, src) + cssNodeListToString(node.block, src)
            else
                return cssNodeListToString(node.prelude, src) + ";"
        case "decl":
            return cssNodeToString(node.property, src) + ":" + cssNodeListToString(node.value, src)
        default:
            let _notAllCasesHandeled: never = node
            return JSON.stringify(node)
    }
}