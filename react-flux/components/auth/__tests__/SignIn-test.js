jest.dontMock("../SignIn.jsx");

describe("SignIn", function() {
	 it("display a Sign In button to log in", function() {
	 	var React = require("react/addons");
	 	var SignIn = require("../Signin.jsx");
	 	var TestUtils = React.addons.TestUtils;

	 	var signin = TestUtils.renderIntoDocument(
	 		<SignIn />;
 		);

 		var node = TestUtils.findRenderedDOMComponentWithTag( signin, "input" );

 		expect( node.getDOMNode().textContent).equalTo("Log In");

	 });
});