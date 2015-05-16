var h = require("../helper/h");
var Tag = require("../../node/tag");

describe("Tag", function() {

  it("verifies `Tag` is a function", function() {

      expect(typeof Tag).toBe("function");

  });

  it("sets some defaults value on new instance", function() {

    var tag = h();
    expect(tag.tagName).toBe("div");
    expect(tag.children).toEqual([]);
    expect(tag.key).toBe(undefined);

  });

  it("set `'key'` property", function() {

    var tag = h({ key: "10" });
    expect(tag.key).toBe("10");

  });

  it("respects default SVG namespace", function() {

    var tag = h({ tagName: "svg" });
    var element = tag.render();
    expect(tag.namespace).toBe("http://www.w3.org/2000/svg");
    expect(element.namespaceURI).toBe("http://www.w3.org/2000/svg");

  });

  it("respects default MathML namespace", function() {

    var tag = h({ tagName: "math" });
    var element = tag.render();
    expect(tag.namespace).toBe("http://www.w3.org/1998/Math/MathML");
    expect(element.namespaceURI).toBe("http://www.w3.org/1998/Math/MathML");

  });

  it("assures children use the parent namespace by default", function() {

    var circle = h({ tagName: "circle" });
    var tag = h({ tagName: "svg" }, [circle]);
    var element = tag.render();
    expect(circle.namespace).toBe("http://www.w3.org/2000/svg");
    expect(element.childNodes[0].namespaceURI).toBe("http://www.w3.org/2000/svg");

  });

  it("assures children rendering is done before applying attributes & properties", function() {

    var select = h({ tagName: "select", attrs: { value: "bar" } }, [
      h({tagName: "option", attrs: {value: "foo"}}, ["foo"]),
      h({tagName: "option", attrs: {value: "bar"}}, ["bar"])
    ]);

    var element = select.render();
    expect(element.value).toBe("bar");

  });

});