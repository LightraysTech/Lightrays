const DEBUG = true

const DEBUG_ADD_SRC_SLICES = DEBUG && true
const DEBUG_PROFILE = DEBUG && false

class Profiler {
    stack: { name: string; start: number, notself: number }[] = []
    metrics: Record<string, { count: number, total: number, self: number }> = {}

    mark(name: string) {
        this.stack.push({
            name,
            start: performance.now(),
            notself: 0,
        })
    }

    end() {
        const t = performance.now()
        const item = this.stack.pop()
        if (!item) throw new Error("Stack empty")

        let m = this.metrics[item.name] || { count: 0, total: 0, self: 0 }
        m.count++
        m.total += t - item.start
        m.self += t - item.start - item.notself
        this.metrics[item.name] = m

        if (this.stack.length > 0) {
            this.stack[this.stack.length - 1].notself += t - item.start;
        }
    }

    report() {
        let out: Record<string, any> = {}
        for (const name in this.metrics) {
            out[name] = {
                avg_self: (this.metrics[name].self / this.metrics[name].count).toFixed(2),
                avg: (this.metrics[name].total / this.metrics[name].count).toFixed(2),
                count: this.metrics[name].count,
                total_self: this.metrics[name].self.toFixed(2),
                total: this.metrics[name].total.toFixed(2),
            }
        }
        console.table(out)
    }
}

const prof = DEBUG_PROFILE ? new Profiler() : null

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
} as const


export const TokenKind = {
    NONE: 0,
    EOF: 1,
    ID: 2,
    STR: 3,
    NUM: 4,
    COMMENT: 5,
    CHAR: 6,
} as const

export const TokenKindStr = Object.keys(TokenKind)

export type TokenKind = typeof TokenKind[keyof typeof TokenKind]

export const CssNodeType = {
    token: 0,
    rule: 1,
    decl: 2,
} as const

interface CssNodeBase {
    type: typeof CssNodeType[keyof typeof CssNodeType]
    start: number
    end: number
}

interface Token extends CssNodeBase {
    type: typeof CssNodeType["token"],
    kind: TokenKind
}

export interface Rule extends CssNodeBase {
    type: typeof CssNodeType["rule"],
    prelude: Token[];
    block: CssNode[];
}

export interface Decl extends CssNodeBase {
    type: typeof CssNodeType["decl"],
    property: Token;
    value: Token[];
    // important: boolean;
}

export type CssNode = Token | Rule | Decl;



const isIdentifierCode = (c: number, numbers: boolean) =>
    (CHAR.a <= c && c <= CHAR.z) ||
    (CHAR.A <= c && c <= CHAR.Z) ||
    ((CHAR[0] <= c && c <= CHAR[9]) && numbers) ||
    c == CHAR.MINUS ||
    c == CHAR.HASH ||
    c == CHAR.UNDERSCORE

const isNumberCode = (c: number) => (CHAR[0] <= c && c <= CHAR[9])
const isNumberStartCode = (c: number) => (CHAR[0] <= c && c <= CHAR[9]) || c == CHAR.PLUS || c == CHAR.MINUS

export class Lexer {
    src: string
    i = 0

    kind: TokenKind = TokenKind.NONE
    start = 0
    end = 0
    ch = 0

    constructor(src: string) {
        this.src = src
        this.next()
    }

    next() {
        do {
            if (this.i >= this.src.length) {
                this.start = this.end = this.i = this.src.length
                this.kind = TokenKind.EOF
                this.ch = CHAR.NUL
                return false
            }
            this.start = this.i
            this.ch = this.src.charCodeAt(this.i)
            this.i++
        }
        while (this.ch == CHAR.CR ||
        this.ch == CHAR.LF ||
        this.ch == CHAR.HTAB ||
        this.ch == CHAR.VTAB ||
            this.ch == CHAR.SPACE
        )

        do {
            if (isNumberStartCode(this.ch)) {
                if (this.ch == CHAR.PLUS || this.ch == CHAR.MINUS) {
                    if (!isNumberCode(this.src.charCodeAt(this.i)))
                        break
                }
                while (isNumberCode(this.src.charCodeAt(this.i))) {
                    this.i++
                }
                if (this.src.charCodeAt(this.i) == CHAR.PERIOD
                    && isNumberCode(this.src.charCodeAt(this.i + 1))
                ) {
                    this.i++
                    while (isNumberCode(this.src.charCodeAt(this.i))) {
                        this.i++
                    }
                }

                this.end = this.i
                this.kind = TokenKind.NUM
                return true
            }
        } while (false)

        if (isIdentifierCode(this.ch, false)) {
            while (isIdentifierCode(this.src.charCodeAt(this.i), true)) {
                this.i++
            }
            this.end = this.i
            this.kind = TokenKind.ID
            return true
        }


        if (this.ch === CHAR.DOUBLE_QUOTE || this.ch === CHAR.SINGLE_QUOTE) {
            while (this.i < this.src.length
                && this.src.charCodeAt(this.i) != this.ch
                && this.src.charCodeAt(this.i) != CHAR.LF
            ) {
                this.i++
                if (this.src.charCodeAt(this.i) == CHAR.BACKSLASH) this.i++
            }
            this.i++

            this.end = this.i
            this.kind = TokenKind.STR
            return true
        }

        if (this.ch == CHAR.SLASH && this.src.charCodeAt(this.i) == CHAR.ASTERISK) {
            this.i++
            while (this.i < this.src.length
                && !(this.src.charCodeAt(this.i) == CHAR.ASTERISK
                    && this.src.charCodeAt(this.i + 1) == CHAR.SLASH)
            ) {
                this.i++
            }
            this.i += 2

            this.end = this.i
            this.kind = TokenKind.COMMENT
            return true
        }

        this.end = this.i
        this.kind = TokenKind.CHAR
        return true
    }

    makeToken(): Token {
        return {
            type: CssNodeType.token,
            kind: this.kind,
            start: this.start,
            end: this.end,
            DEBUG: DEBUG_ADD_SRC_SLICES ? this.src.slice(this.start, this.end) : undefined
        }
    }

    rewind(mark: number) {
        this.i = mark
        this.next()
    }
}

export function parse(src: string) {
    const l = new Lexer(src)
    // debugger
    prof?.mark("parse")
    const nodes = nodelist(l, false)
    prof?.end()
    prof?.report()

    return nodes
}

function decl(l: Lexer): Decl | null {
    const mark = l.start

    if (l.kind != TokenKind.ID) {
        l.rewind(mark)
        return null
    }

    const property = l.makeToken()

    l.next()
    if (l.ch != CHAR.COLON) {
        l.rewind(mark)
        return null
    }
    l.next()

    const value: Token[] = []
    for (; l.kind as number != TokenKind.EOF; l.next()) {
        if (l.ch as number == CHAR.SEMICOLON) break
        if (l.ch as number == CHAR.RIGHT_BRACE) break
        if (l.ch as number == CHAR.LEFT_BRACE) {
            l.rewind(mark)
            return null
        }
        value.push(l.makeToken())
    }
    if (l.ch as number != CHAR.SEMICOLON) l.i--

    l.next()

    return { type: CssNodeType.decl, property, value, start: mark, end: l.start }
}

function rule(l: Lexer): Rule | null {
    const mark = l.start

    const isAtRule = l.ch == CHAR.At
    let hasBody = true

    const prelude: Token[] = []
    for (; l.kind != TokenKind.EOF; l.next()) {
        if (l.ch == CHAR.SEMICOLON) {
            if (isAtRule) {
                hasBody = false
                break
            } else {
                l.rewind(mark)
                return null
            }
        }
        if (l.ch == CHAR.LEFT_BRACE) break
        if (l.ch == CHAR.RIGHT_BRACE) {
            l.rewind(mark)
            return null
        }
        prelude.push(l.makeToken())
    }

    let block: CssNode[] = []

    if (hasBody) {
        if (l.ch != CHAR.LEFT_BRACE) {
            l.rewind(mark)
            return null
        }
        l.next()

        block = nodelist(l, true)

        if (l.kind != TokenKind.EOF && l.ch as number != CHAR.RIGHT_BRACE) {
            l.rewind(mark)
            return null
        }
    }

    l.next()


    return { type: CssNodeType.rule, prelude, block, start: mark, end: l.start }
}

function nodelist(l: Lexer, isInBlock: boolean): CssNode[] {
    const nodes: CssNode[] = []

    while (l.kind != TokenKind.EOF && (l.ch != CHAR.RIGHT_BRACE || !isInBlock)) {
        let res: CssNode | null = null

        if (l.kind == TokenKind.COMMENT) {
            nodes.push(l.makeToken())
            l.next()
            continue
        }

        prof?.mark("decl")
        if (res = decl(l)) {
            nodes.push(res)
            // console.log(src.slice(res.start, res.end), res);
            prof?.end()
            continue
        }
        prof?.end()

        prof?.mark("rule")
        if (res = rule(l)) {
            nodes.push(res)
            // console.log(src.slice(res.start, res.end), res);
            prof?.end()
            continue
        }
        prof?.end()

        res = l.makeToken()
        nodes.push(res)
        l.next()
        // console.log(src.slice(res.start, res.end), res);
    }

    if (DEBUG_ADD_SRC_SLICES) {
        for (const key in nodes) {
            if (!Object.hasOwn(nodes, key)) continue;

            nodes[key]._DEBUG = l.src.slice(nodes[key].start, nodes[key].end)
        }
    }

    return nodes
}

export function nodeSlice(nodes: CssNode[], src: string) {
    if (nodes.length == 0) return ""
    return src.slice(nodes[0].start, nodes[nodes.length - 1].end)
}

export function cssNodeListToString(nodes: CssNode[], src: string) {
    return nodes.map(node => cssNodeToString(node, src)).join("")
}

export function cssNodeToString(node: CssNode, src: string): string {
    switch (node.type) {
        case CssNodeType.token:
            return src.slice(node.start, node.end)
        case CssNodeType.rule:
            if (node.block)
                return cssNodeListToString(node.prelude, src) + cssNodeListToString(node.block, src)
            else
                return cssNodeListToString(node.prelude, src) + ";"
        case CssNodeType.decl:
            return cssNodeToString(node.property, src) + ":" + cssNodeListToString(node.value, src)
        default:
            let _notAllCasesHandeled: never = node
            return JSON.stringify(node)
    }
}