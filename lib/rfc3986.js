'use strict';

const rfc3986 = {};

/**
 * elements separated by forward slash ("/") are alternatives.
 */
const or = '|';

/**
 * DIGIT = %x30-39 ; 0-9
 */
const digit = '0-9';
const digitOnly = `[${digit}]`;

/**
 * ALPHA = %x41-5A / %x61-7A   ; A-Z / a-z
 */
const alpha = 'a-zA-Z';
const alphaOnly = `[${alpha}]`;

/**
 * cidr       = DIGIT                ; 0-9
 *            / %x31-32 DIGIT         ; 10-29
 *            / "3" %x30-32           ; 30-32
 */
rfc3986.cidr = `${digitOnly}${or}[1-2]${digitOnly}${or}3[0-2]`;

/**
 * HEXDIG = DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
 */
const hexDigit = `${digit}A-Fa-f`;
const hexDigitOnly = `[${hexDigit}]`;

/**
 * unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
 */
const unreserved = `${alpha}${digit}-\\._~`;

/**
 * sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
 */
const subDelims = '!\\$&\'\\(\\)\\*\\+,;=';

/**
 * pct-encoded = "%" HEXDIG HEXDIG
 */
const pctEncoded = `%${hexDigit}`;

/**
 * pchar = unreserved / pct-encoded / sub-delims / ":" / "@"
 */
const pchar = `${unreserved}${pctEncoded}${subDelims}:@`;
const pcharOnly = `[${pchar}]`;

/**
 * Rule to support zero-padded addresses.
 */
const zeroPad = '0?';

/**
 * dec-octet   = DIGIT                 ; 0-9
 *            / %x31-39 DIGIT         ; 10-99
 *            / "1" 2DIGIT            ; 100-199
 *            / "2" %x30-34 DIGIT     ; 200-249
 *            / "25" %x30-35          ; 250-255
 */
const decOctect = `(?:${zeroPad}${zeroPad}${digitOnly}${or}${zeroPad}[1-9]${digitOnly}${or}1${digitOnly}${digitOnly}${or}2[0-4]${digitOnly}${or}25[0-5])`; // eslint-disable-line max-len

/**
 * IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet
 */
rfc3986.IPv4address = `(?:${decOctect}\\.){3}${decOctect}`;

/**
 * h16 = 1*4HEXDIG ; 16 bits of address represented in hexadecimal
 * ls32 = ( h16 ":" h16 ) / IPv4address ; least-significant 32 bits of address
 * IPv6address =                            6( h16 ":" ) ls32
 *             /                       "::" 5( h16 ":" ) ls32
 *             / [               h16 ] "::" 4( h16 ":" ) ls32
 *             / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
 *             / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
 *             / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
 *             / [ *4( h16 ":" ) h16 ] "::"              ls32
 *             / [ *5( h16 ":" ) h16 ] "::"              h16
 *             / [ *6( h16 ":" ) h16 ] "::"
 */
const h16 = `${hexDigitOnly}{1,4}`;
const ls32 = `(?:${h16}:${h16}|${rfc3986.IPv4address})`;
const IPv6SixHex = `(?:${h16}:){6}${ls32}`;
const IPv6FiveHex = `::(?:${h16}:){5}${ls32}`;
const IPv6FourHex = `(?:${h16})?::(?:${h16}:){4}${ls32}`;
const IPv6ThreeHex = `(?:(?:${h16}:){0,1}${h16})?::(?:${h16}:){3}${ls32}`;
const IPv6TwoHex = `(?:(?:${h16}:){0,2}${h16})?::(?:${h16}:){2}${ls32}`;
const IPv6OneHex = `(?:(?:${h16}:){0,3}${h16})?::${h16}:${ls32}`;
const IPv6NoneHex = `(?:(?:${h16}:){0,4}${h16})?::${ls32}`;
const IPv6NoneHex2 = `(?:(?:${h16}:){0,5}${h16})?::${h16}`;
const IPv6NoneHex3 = `(?:(?:${h16}:){0,6}${h16})?::`;
rfc3986.IPv6address = `(?:${IPv6SixHex}${or}${IPv6FiveHex}${or}${IPv6FourHex}${or}${IPv6ThreeHex}${or}${IPv6TwoHex}${or}${IPv6OneHex}${or}${IPv6NoneHex}${or}${IPv6NoneHex2}${or}${IPv6NoneHex3})`; // eslint-disable-line max-len

/**
 * IPvFuture = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
 */
rfc3986.IPvFuture = `v${hexDigitOnly}+\\.[${unreserved}${subDelims}:]+`;

/**
 * scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
 */
rfc3986.scheme = `${alphaOnly}[${alpha}${digit}+-\\.]*`;

/**
 * userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
 */
const userinfo = `[${unreserved}${pctEncoded}${subDelims}:]*`;

/**
 * IP-literal = "[" ( IPv6address / IPvFuture  ) "]"
 */
const IPLiteral = `\\[(?:${rfc3986.IPv6address}${or}${rfc3986.IPvFuture})\\]`;

/**
 * reg-name = *( unreserved / pct-encoded / sub-delims )
 */
const regName = `[${unreserved}${pctEncoded}${subDelims}]{0,255}`;

/**
 * host = IP-literal / IPv4address / reg-name
 */
const host = `(?:${IPLiteral}${or}${rfc3986.IPv4address}${or}${regName})`;

/**
 * port = *DIGIT
 */
const port = `${digitOnly}*`;

/**
 * authority   = [ userinfo "@" ] host [ ":" port ]
 */
const authority = `(?:${userinfo}@)?${host}(?::${port})?`;

/**
 * segment       = *pchar
 * segment-nz    = 1*pchar
 * path          = path-abempty    ; begins with "/" or is empty
 *               / path-absolute   ; begins with "/" but not "//"
 *               / path-noscheme   ; begins with a non-colon segment
 *               / path-rootless   ; begins with a segment
 *               / path-empty      ; zero characters
 * path-abempty  = *( "/" segment )
 * path-absolute = "/" [ segment-nz *( "/" segment ) ]
 * path-rootless = segment-nz *( "/" segment )
 */
const segment = `${pcharOnly}*`;
const segmentNz = `${pcharOnly}+`;
const segmentNzNc = `[${unreserved}${pctEncoded}${subDelims}@]+`;
const pathEmpty = '';
const pathAbEmpty = `(?:\\/${segment})*`;
const pathAbsolute = `\\/(?:${segmentNz}${pathAbEmpty})?`;
const pathRootless = segmentNz + pathAbEmpty;
const pathNoScheme = segmentNzNc + pathAbEmpty;

/**
 * hier-part = "//" authority path
 */
rfc3986.hierPart = `(?:(?:\\/\\/${authority}${pathAbEmpty})${or}${pathAbsolute}${or}${pathRootless})`; // eslint-disable-line max-len

/**
 * relative-part = "//" authority path-abempty
 *                 / path-absolute
 *                 / path-noscheme
 *                 / path-empty
 */
rfc3986.relativeRef = `(?:(?:\\/\\/${authority}${pathAbEmpty})${or}${pathAbsolute}${or}${pathNoScheme}${or}${pathEmpty})`; // eslint-disable-line max-len

/**
 * query = *( pchar / "/" / "?" )
 */
// Finish matching either at the fragment part or end of the line.
rfc3986.query = `[${pchar}\\/\\?]*(?=#|$)`;

/**
 * fragment = *( pchar / "/" / "?" )
 */
rfc3986.fragment = `[${pchar}\\/\\?]*`;

const prefix = `(?:${rfc3986.scheme}:${rfc3986.hierPart})`;
const re = new RegExp(`^${prefix}(?:\\?${rfc3986.query})?(?:#${rfc3986.fragment})?$`);

module.exports = re;
