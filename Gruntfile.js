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
                    { 'src/js/react/InputAuthForm.js': 'src/js/react/jsx/InputAuthForm.jsx' },
                    { 'src/js/react/Header.js': 'src/js/react/jsx/Header.jsx' },
                    { 'src/js/react/Footer.js': 'src/js/react/jsx/Footer.jsx' },
                    { 'src/js/react/Avater.js': 'src/js/react/jsx/Avater.jsx' },
                    { 'src/js/react/LoginedView.js': 'src/js/react/jsx/LoginedView.jsx' },
                    { 'src/js/react/SettingMenu.js': 'src/js/react/jsx/SettingMenu.jsx' },
                    { 'src/js/react/View_ToDo.js': 'src/js/react/jsx/Views/View_ToDo.jsx' },
                    { 'src/js/react/View_Dashboard.js': 'src/js/react/jsx/Views/View_Dashboard.jsx' },
                    { 'src/js/react/View_AdminTools.js': 'src/js/react/jsx/Views/View_AdminTools.jsx' },
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