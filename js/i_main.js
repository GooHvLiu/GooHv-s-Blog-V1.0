    // 简单的打字机脚本
    let textToType = "Equipment Development | Technical Sharing | Open Source";//打字内容
    let typingElement = document.getElementById('typing-text');//获取打字显示的元素，用于打字显示的文本内容
    let btnContactMe = document.getElementById('btn-contact');//获取联系我按钮，用于点击显示邮箱地址
    let index = 0;//打字索引，用于控制打字进度

    /**
     * 打字机效果函数，逐字符显示预设文本
     * 每次显示一个字符后延迟100ms继续显示下一个字符
     */
    function typeWords() {
        if (index < textToType.length) {
            typingElement.textContent = typingElement.textContent + textToType.charAt(index);
            index++;//每打一个字，索引加1            
            // 打字速度调整，此处为60ms延迟每个字符
            setTimeout(typeWords, 60); 
        }
    }

    //用户点击联系我按钮，切换显示邮箱地址
    btnContactMe.addEventListener("click",function(){
        if(this.innerText=="879639340@qq.com"){
            this.innerText = "_ Contact Me ! _";
        }
        else{
            this.innerText = "879639340@qq.com";
        }
        
    })
    // 页面加载完成后开始打字
    window.onload = typeWords;