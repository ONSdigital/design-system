module.exports = async (page) => {
    page.evaluate(async () => {
        document.querySelectorAll('[loading="lazy"]').forEach((element) => {
            element.loading = 'eager';
        });
    });
};
