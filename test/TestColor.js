TestCase("TestColor", {
    "test color": function() {
        var color = new utilidades.Color(1, 2, 3);
        assertEquals("rgb(1, 2, 3)", color.rgb);
    }
});
