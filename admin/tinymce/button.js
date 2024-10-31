(function() {
    tinymce.PluginManager.add('rs_responsive_gallery_tc_button', function( editor, url ) {
        editor.addButton( 'rs_responsive_gallery_tc_button', {
            text: 'Gallery Shortcode',
            icon: false,
            onclick: function() {
                editor.insertContent('[rsgallery category="Category_Name"]');
            }
        });
    });
})();