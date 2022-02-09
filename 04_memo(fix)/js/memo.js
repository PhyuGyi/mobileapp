"use strict";
window.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage==="undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
        }else{
            viewStorage();
            saveLocalStorage();
            selectTable();
            delLocalStorage();
            allClearLocalStorage();
            
        }
    },false
);

//3.LocalStorage
function saveLocalStorage(){    
    const save= document.getElementById("save");
    save.addEventListener("click",
        function  (e){
        e.preventDefault();
        const key =document.getElementById("textKey").value;
        const value =document.getElementById("textMemo").value;

        if (key=="" || value==""){
            window.alert("key,Memoはいずれも必須です。");
            return;
        }else{
            const key=document.getElementById("textKey").value;
            const value =document.getElementById("textMemo").value; 
            let w_confirm = window.confirm("LocalStorageに\n"+key+" "+ value + "\nを保存(save) しますか？");
            if (w_confirm === true){//version-up1    
                    localStorage.setItem(key,value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value ="";
                    document.getElementById("textMemo").value = "";
                } //version-up1  
            }
            
        }, false
    );
   
};
// データ削除version3
function delLocalStorage(){
    const del= document.getElementById("del");
    del.addEventListener("click",
        function(e){
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");//version3
            const table1 = document.getElementById("table1");//version3
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");//version2

            if (w_cnt >= 1){
                //const key=document.getElementById("textKey").value;
                //const value =document.getElementById("textMemo").value;  
                let w_confirm = window.confirm("LocalStorage から選択されている" +w_cnt  + "件を削除(delete)しますか？");//version3
                if (w_confirm === true){//version-up1
                    for(let i=0; i < chkbox1.length; i++){
                        if(chkbox1[i].checked){
                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);//version3
                        } 
                    }    
                    //localStorage.removeItem(key); 
                    viewStorage();
                    let w_msg = ("LocalStorage から"+ w_cnt + "件を削除(delete)しました。");//version3
                    window.alert(w_msg);
                    document.getElementById("textKey").value ="";
                    document.getElementById("textMemo").value =""; 
                }   
            }
        },false
    );
}; 

//4.localStorage
function  allClearLocalStorage(){
    const allClear= document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
                let w_confirm = window.confirm("LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか？");
                if (w_confirm===true){ 
                localStorage.clear()
                viewStorage();
                let w_msg = ("LocalStorageのデータを全て削除(all clear)しました。");
                window.alert(w_msg);
                document.getElementById("textKey").value="";
                document.getElementById("textMemo").value="";
            }   
        },false
    );
};

// 5.データ選択
function selectTable(){
    const select= document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault;
            selectCheckBox("select");
        },false
    );
};

// テーブルからデータ選択
function selectCheckBox(mode){
    //let w_sel = "0";
    let w_cnt = 0;    
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";//version2
    let w_textMemo = "";//version2
    for(let i=0; i < chkbox1.length; i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo= table1.rows[i+1].cells[2].firstChild.data;
                //return w_sel = "1";
            }   
            w_cnt++;
        }
    }  
    document.getElementById("textKey").value=w_textKey;//version2
    document.getElementById("textMemo").value=w_textMemo;//version2
        //selectCheckBox(mode);
        if(mode=== "select"){
        if(w_cnt===1){//version3
        return w_cnt;//version3
        }else{
        window.alert("1つ選択(select)してください。");
        }   
    }
    if(mode=== "del"){
        if(w_cnt >= 1){
            return w_cnt;
        }else{
        window.alert("１つを選択(select)してください。");
        }
    }     
};

function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0]) list.deleteRow(0);

    for (let i=0; i < localStorage.length; i++){
        let w_key =localStorage.key(i);       
        let tr =document.createElement("tr");
        let td1 =document.createElement("td");
        let td2 =document.createElement("td");
        let td3 =document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td1.innerHTML="<input type='checkbox' name = 'chkbox1'>";
        td2.innerHTML=w_key;
        td3.innerHTML=localStorage.getItem(w_key);
    }
    //jQuery
    $("#table1").tablesorter({
        sortList:[[1,0]]
    });
    $("#table1").trigger("update");
};
