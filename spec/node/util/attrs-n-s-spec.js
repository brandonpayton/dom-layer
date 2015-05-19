var h = require("../../helper/h");
var _ = require("../../helper/util");
var patch = require("../../../tree/patch");
var attrsNS = require("../../../node/util/attrs-n-s");

var namespaces = attrsNS.namespaces;

describe("attrsNS", function() {

  describe(".apply()", function() {

    it("sets namespaced attributes", function() {

      var from = h({
        tagName: "image",
        attrsNS: {
          "xlink:href": "test.jpg"
        },
        namespace: "http://www.w3.org/2000/svg"
      });

      var rootNode = from.render();
      expect(rootNode.getAttributeNS(namespaces["xlink"], "href")).toBe("test.jpg");

    });

    it("unsets namespaced attributes", function() {

      var from = h({
        tagName: "image",
        attrsNS: {
          "xlink:href": "test.jpg"
        },
        namespace: "http://www.w3.org/2000/svg"
      });

      var to = h({
        tagName: "image",
        attrsNS: {},
        namespace: "http://www.w3.org/2000/svg"
      });

      var rootNode = from.render();
      var newRoot = patch.node(from, to);
      expect(newRoot).toBe(rootNode);
      expect(rootNode.getAttributeNS(namespaces["xlink"], "href")).toBeFalsy();
    });

  });

});
