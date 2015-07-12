module.exports = {
    app: 'assets',
    dist: 'public',
    banner: '/**\n' +
            ' * @version <%= new Date().toISOString().split("T")[0] %>\n' +
            ' * @author Alexander Sofin <avlasof@mail.ru>\n' +
            ' * @link https://github.com/avlasof\n' +
            ' *\n' +
            ' * Built with gulp (more https://github.com/avlasof/gulp-init)\n' +
            ' *\n' +
            '**/\n'
}
