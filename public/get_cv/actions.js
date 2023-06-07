window.onload = ()=>{
    const skillLevelDivsClassNames = ['vlow', 'low', 'medium', 'high', 'vhigh'];
    let skillLevels = parseInt(document.querySelectorAll('levelValue'));
    levelBar = document.querySelectorAll('.level_bar'); 
    skillLevels.forEach(skillLevel => {
        let count = 0;
        for(let i = 0; i < skillLevel; i++){ 
            levelBar[count].children[i].classList.add(skillLevelDivsClassNames[i]) 
            } 
    });
}