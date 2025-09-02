function mdToHtml(md){
  // Escape
  md = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Code blocks ```
  md = md.replace(/```([\s\S]*?)```/g, function(_, code){ return "<pre><code>"+code.replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</code></pre>"; });
  // Headings
  md = md.replace(/^###### (.*)$/gm, "<h6>$1</h6>");
  md = md.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
  md = md.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
  md = md.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  md = md.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  md = md.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  // Bold / italic
  md = md.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  md = md.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Inline code
  md = md.replace(/`([^`]+?)`/g, "<code>$1</code>");
  // Links
  md = md.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // Blockquote
  md = md.replace(/^\> (.*)$/gm, "<blockquote>$1</blockquote>");
  // Simple lists
  md = md.replace(/(?:^|\n)([\-\*] .+(?:\n[\-\*] .+)*)/g, function(match){
    const items = match.trim().split(/\n/).map(line => line.replace(/^[\-\*] /,'').trim()).map(x=>"<li>"+x+"</li>").join("");
    return "\n<ul>"+items+"</ul>";
  });
  // Paragraphs
  md = md.replace(/^(?!<h\d>|<ul>|<blockquote>|<pre>|<\/ul>|<li>|<\/li>|<code>|<\/code>)(.+)$/gm, "<p>$1</p>");
  return md;
}
