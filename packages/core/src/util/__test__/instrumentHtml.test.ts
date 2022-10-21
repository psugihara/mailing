import instrumentHtml from "../instrumentHtml";

describe("instrumentHtml", () => {
  const messageId = "123";
  const apiUrl = "https://api.com";

  it("should instrument html", () => {
    const html = `
    <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <a href="https://google.com">Google</a>
        <a href="https://yahoo.com">Yahoo</a>
      </body>
    </html>
  `;

    const result = instrumentHtml({ html, messageId, apiUrl });

    expect(result).toContain(
      'href="https://api.com/api/hooks/click?messageId=123&url=https%3A%2F%2Fgoogle.com"'
    );
    expect(result).not.toContain('href="https://google.com"');
    expect(result).toContain(
      '<img alt="" src="https://api.com/api/hooks/open?messageId=123" >'
    );

    expect(result).toMatchSnapshot();
  });

  it("throws error if no body found", () => {
    const html = `
      <html>
        <head>
          <title>Test</title>
        </head>
      </html>
    `;

    expect(() => instrumentHtml({ html, messageId, apiUrl })).toThrow();
  });
});
