var ncmbController = {
    APPLICATION_KEY: "YOUR_APPLICATION_KEY",
    CLIENT_KEY: "YOUR_CLIENT_KEY",

    ncmb: null,

    // ������
    init: function(screenSize) {
        var self = this;
        self.ncmb = new NCMB(self.APPLICATION_KEY, self.CLIENT_KEY);    // mobile backend�̏�����
        //����{�^���̓�����K��
        document.getElementById("closeRanking").addEventListener("click", function () {
            self.closeRanking();
        });
    },
    // �X�R�A���M
    sendScore: function(score) {
        var self = this;
    
        // Score�i�N���X�j�𐶐�
        
    },
    showRanking: function() {
        var self = this;
    
        //�X�R�A�����擾���邽�߁A�N���X���쐬
        var Score = self.ncmb.DataStore("ScoreClass");
    
        //�X�R�A���~����10���擾
        Score.order("score", true)
            .include("user")
            .limit(10)
            .fetchAll()
            .then(function(results){
        
                //�����L���O�\��HTML����
                var tableSource = "";
                if(results.length > 0){
                    for(i=0; i<results.length; i++){
                        var score = results[i],
                            rank = i + 1,
                            value = parseInt(score.score),
                            displayName = "NO NAME";
        
                        tableSource += "<li class=\"list__item list__item--inset\">"
                            + rank + ":"
                            + score.username
                            + " (" + value + ")</li>";
                    }
                } else {
                    tableSource += "<li class=\"list__item list__item--inset\">�����L���O�͂���܂���</li>";
                }
                document.getElementById("rankingTable").innerHTML = tableSource;
                // $("#").html(tableSource);
                //�����L���O��ʂ�\������
                document.getElementById("ranking").style.display = 'block';
            })
            .catch(function(err){
              console.log(err);
            });
    },
    //�����L���O��ʂ����
    closeRanking:function() {
        document.getElementById("ranking").style.display = 'none';
    }
}