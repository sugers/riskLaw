import $ from 'jquery'
function resizes () {

    let screenWidth = document.body.clientWidth;
    $('.navmask').hide();
    if (screenWidth > 1200) {
        $('.sideNav').show()
    } else {
        $('.sideNav').hide()
    }

    window.onresize = () => {
        return (() => {
            screenWidth = document.body.clientWidth;
            $('.navmask').hide();
            if (screenWidth > 1200) {
                $('.sideNav').show();
            } else {
                $('.sideNav').hide()
            }
        })()
    }
    $('.navtab .el-menu-item').on('click', () => {
        if (screenWidth < 1200) {
            $('.sideNav').hide()
            $('.navmask').hide();
        } else {
            $('.sideNav').show()
        }

    })
}
export { resizes }