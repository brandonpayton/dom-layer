var h = require("../helper/h");
var _ = require("../helper/util");
var Text = require("../../node/text");
var patch = require("../../tree/patch");

describe("patch.node()", function() {

  it("patches a text node", function() {

    var from = new Text("hello");
    var to = new Text("good bye");
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("patches a wrapped text node", function() {

    var from = h({}, ["hello"]);
    var to = h({}, ["good bye"]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("patches a wrapped text node with its container", function() {

    var from = h({}, ["hello"]);
    var to = h({ tagName: "span" }, ["good bye"]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("patches a text node into a tag node", function() {

    var from = new Text("hello");
    var to = h({ tagName: "span" }, ["good bye"]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("can patch a tag node into a text node", function() {

    var from = h({}, [h()]);
    var to = h({}, ["text"]);

    var rootNode = from.render();
    expect(rootNode.childNodes.length).toBe(1);
    expect(rootNode.childNodes[0].nodeType).toBe(1);

    var newRoot = patch.node(from, to);

    expect(newRoot).toBe(rootNode);
    expect(newRoot.childNodes.length).toBe(1);
    expect(newRoot.childNodes[0].nodeType).toBe(3);

  });

  it("patches a wrapped a text node by a tag node", function() {

    var from = h({}, ["hello"]);
    var to = h({}, [h({ tagName: "span" }, ["good bye"])]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("inserts an additionnal text node", function() {

    var from = h({}, ["hello"]);
    var to = h({}, ["hello", "to"]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("inserts an additionnal tag node", function() {

    var from = h({}, [h({ tagName: "span" }, ["hello"])]);
    var to = h({}, [h({ tagName: "span" }, ["hello"]), h({ tagName: "span" }, ["to"])]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("removes a text node", function () {

    var to = h({}, ["hello", "to"]);
    var from = h({}, ["hello"]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("patches multiple changes", function() {

    var from = h({ tagName: "div", className: "hello" }, ["hello"]);
    var to = h({ tagName: "span", className: "good bye" }, ["good bye"]);
    var rootNode = from.render();
    var newNode = to.render();
    var newRoot = patch.node(from, to);
    expect(newRoot).toEqual(newNode);

  });

  it("does not ignores empty textnode", function() {

    var empty = h({ tagName: "span" }, [""]);
    var rootNode = empty.render();
    expect(rootNode.childNodes.length).toBe(1);

  });

  it("patches if different namespaces", function() {

    var from = h({ attrs: { xmlns: "testing" } });
    var to = h({ attrs: { xmlns: "undefined" } });

    var rootNode = from.render();
    expect(rootNode.tagName.toLowerCase()).toBe("div");
    expect(rootNode.namespaceURI).toBe("testing");

    rootNode = patch.node(from, to);

    expect(rootNode.tagName.toLowerCase()).toBe("div");
    expect(rootNode.namespaceURI).toBe("undefined");

  });

  it("checks that `domLayerNode` is correctly updated when `events` is defined", function() {

    var from = h({ events: { "onclick": function() {} } });
    var to = h({ events: { "onclick": function() {} } });

    var rootNode = from.render();
    expect(rootNode.domLayerNode).toBe(from);

    rootNode = patch.node(from, to);

    expect(rootNode.domLayerNode).toBe(to);

  });

  it("checks that `domLayerNode` is unsetted when no more `events` are defined", function() {

    var from = h({ events: { "onclick": function() {} } });
    var to = h();

    var rootNode = from.render();
    expect(rootNode.domLayerNode).toBe(from);

    rootNode = patch.node(from, to);

    expect(rootNode.domLayerNode).toBe(undefined);

  });

});
