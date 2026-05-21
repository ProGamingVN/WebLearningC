export function highlightCpp(raw: string): string {
  // Escape HTML first
  let code = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Order matters: comments and strings first
  const placeholders: string[] = [];
  let pi = 0;
  const ph = (s: string) => { placeholders.push(s); return `\x00${pi++}\x00`; };

  // Comments
  code = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, m => ph(`<span class="cm">${m}</span>`));
  // Strings
  code = code.replace(/"([^"\\]|\\.)*"/g, m => ph(`<span class="str">${m}</span>`));
  // Chars
  code = code.replace(/'([^'\\]|\\.)*'/g, m => ph(`<span class="str">${m}</span>`));

  // Keywords
  const kws = /\b(auto|break|case|catch|class|const|constexpr|continue|default|delete|do|else|enum|explicit|extern|false|for|friend|goto|if|inline|namespace|new|nullptr|operator|private|protected|public|return|sizeof|static|struct|switch|template|this|throw|true|try|typedef|typename|union|using|virtual|void|volatile|while)\b/g;
  code = code.replace(kws, '<span class="kw">$&</span>');

  // Types
  const types = /\b(int|long|short|char|bool|double|float|string|wstring|size_t|unsigned|signed|vector|map|set|queue|stack|deque|pair|tuple|array|bitset|list|multimap|multiset|unordered_map|unordered_set|priority_queue|auto)\b/g;
  code = code.replace(types, '<span class="ty">$&</span>');

  // Numbers
  code = code.replace(/\b(\d+(\.\d+)?(e[+-]?\d+)?[uUlLfF]*|0x[0-9a-fA-F]+)\b/g, '<span class="num">$&</span>');

  // Preprocessor
  code = code.replace(/(#\s*(?:include|define|ifdef|ifndef|endif|pragma|undef|if|else|elif)[^\n]*)/g, '<span class="macro">$&</span>');

  // Restore placeholders
  code = code.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[+i]);

  return code;
}
