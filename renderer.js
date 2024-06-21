var dirPath = document.getElementById('dir-path')
var selectPathBtn = document.getElementById('select-path')
var installBtn = document.getElementById('install')

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
console.log(information)

selectPathBtn.addEventListener('click', async () => {
    const installed = await versions.selectPath()
    dirPath.value = installed
});

installBtn.addEventListener('click', async () => {
    await versions.install(dirPath.value)
    console.log('Done')
});
