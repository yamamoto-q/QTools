module.exports = function(grunt) {
    grunt.initConfig({
        replace: {
            version: {
                src: ['src/js/react/_Template_BuildInfo.js'],
                dest: 'src/js/react/BuildInfo.js',
                overwrite: false,
                replacements: [{
                    from: "{version}",
                    to: "<%= grunt.template.today('yyyy.mm.dd HH:MM') %>"
                }]
            }
        },
        copy: {
            html: {
                files: [
                    { expand: true, cwd: 'src/html/', src: ['index.html'], dest: 'dist/', filter: 'isFile' },
                    { expand: true, cwd: 'src/binaly/', src: ['quater-inch.ttf'], dest: 'dist/css/', filter: 'isFile' }
                ]
            },
            js: {
                files: [
                    { expand: true, cwd: 'src/js/', src: ['QTools.js'], dest: 'dist/js/', filter: 'isFile' }
                ]
            }
        },
        less:{
            dist: {
                options: {
                    compress: false
                },
                files: [
                    {"dist/css/style.css": "src/css/style.less"},
                ]
            }
        },
        babel: {
            options: {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            app: {
                files: [
                    { 'src/js/react/AppEntry.js': 'src/js/react/jsx/AppEntry.jsx' },
                    { 'src/js/react/QTools.js': 'src/js/react/jsx/QTools.jsx' },
                    { 'src/js/react/ScrollArea.js': 'src/js/react/jsx/ScrollArea.jsx' },
                    { 'src/js/react/Layout_Header.js': 'src/js/react/jsx/Layout/Layout_Header.jsx' },
                    { 'src/js/react/Layout_Body.js': 'src/js/react/jsx/Layout/Layout_Body.jsx' },
                    { 'src/js/react/Layout_BodyLeft.js': 'src/js/react/jsx/Layout/Layout_BodyLeft.jsx' },
                    { 'src/js/react/Layout_BodyRight.js': 'src/js/react/jsx/Layout/Layout_BodyRight.jsx' },
                    { 'src/js/react/InputAuthForm.js': 'src/js/react/jsx/InputAuthForm.jsx' },
                    { 'src/js/react/Footer.js': 'src/js/react/jsx/Footer.jsx' },
                    { 'src/js/react/NavItem.js': 'src/js/react/jsx/NavItem.jsx' },
                    { 'src/js/react/LoginedView.js': 'src/js/react/jsx/LoginedView.jsx' },
                    { 'src/js/react/SettingMenu.js': 'src/js/react/jsx/SettingMenu.jsx' },
                    { 'src/js/react/View_Home.js': 'src/js/react/jsx/Views/View_Home.jsx' },
                    { 'src/js/react/View_Work.js': 'src/js/react/jsx/Views/View_Work.jsx' },
                    { 'src/js/react/View_Apps.js': 'src/js/react/jsx/Views/View_Apps.jsx' },
                    { 'src/js/react/View_AdminTools.js': 'src/js/react/jsx/Views/View_AdminTools.jsx' },
                    { 'src/js/react/Layout_List.js': 'src/js/react/jsx/Layout/Layout_List.jsx' },
                    // Elements
                    { 'src/js/react/Elem_Header.js': 'src/js/react/jsx/Views/Elements/Elem_Header.jsx' },
                    { 'src/js/react/Elem_Avater.js': 'src/js/react/jsx/Views/Elements/Elem_Avater.jsx' },
                    { 'src/js/react/Elem_MyWorkItems_Summary.js': 'src/js/react/jsx/Views/Elements/Elem_MyWorkItems_Summary.jsx' },
                    { 'src/js/react/Elem_Apps_Summary.js': 'src/js/react/jsx/Views/Elements/Elem_Apps_Summary.jsx' },
                    { 'src/js/react/Elem_MyWorkitemList.js': 'src/js/react/jsx/Views/Elements/Elem_MyWorkitemList.jsx' },
                    { 'src/js/react/Elem_ListViewSwitcher.js': 'src/js/react/jsx/Views/Elements/Elem_ListViewSwitcher.jsx' },
                    { 'src/js/react/Elem_WorkitemListItem.js': 'src/js/react/jsx/Views/Elements/Elem_WorkitemListItem.jsx' },
                    { 'src/js/react/Elem_AppViewSortSwitcher.js': 'src/js/react/jsx/Views/Elements/Elem_AppViewSortSwitcher.jsx' },
                    { 'src/js/react/Elem_AppItem.js': 'src/js/react/jsx/Views/Elements/Elem_AppItem.jsx' },
                    // Bootstrap
                    { 'src/js/react/Bootstrap_Row.js': 'src/js/react/jsx/Bootstrap/row.jsx' },
                    { 'src/js/react/Bootstrap_Container.js': 'src/js/react/jsx/Bootstrap/container.jsx' },
                    { 'src/js/react/Bootstrap_Col.js': 'src/js/react/jsx/Bootstrap/col.jsx' },
                    { 'src/js/react/Bootstrap_FormGroup.js': 'src/js/react/jsx/Bootstrap/formGroup.jsx' },
                    { 'src/js/react/Bootstrap_FormLabel.js': 'src/js/react/jsx/Bootstrap/formLabel.jsx' },
                    { 'src/js/react/Bootstrap_FormInput.js': 'src/js/react/jsx/Bootstrap/formInput.jsx' },
                    { 'src/js/react/Bootstrap_Button.js': 'src/js/react/jsx/Bootstrap/button.jsx' },
                    { 'src/js/react/Bootstrap_InputGroup.js': 'src/js/react/jsx/Bootstrap/inputGroup.jsx' },
                ]
            }
        },
        browserify: {
            app: {
                files: {
                    'src/js/QTools.js': ['src/js/react/AppEntry.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks("grunt-text-replace");

    grunt.registerTask('_Dev', ['replace:version', 'copy:html', 'less', 'babel', 'browserify', 'copy:js']);
};