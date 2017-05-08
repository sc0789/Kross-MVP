var app = angular.module("videoMvpApp", []); 
app.controller("mainCtrl", function($scope, $http) {
    $scope.playAble = null;
    $scope.originalVideoUrl;

    // $scope.videoUrl = "http://localhost:3000/videos/mov_bbb.mp4";
    // $scope.endTime = "00:05";
    // $scope.startTime = "00:02";
    // $scope.clipName = "steven";

    $scope.loadVideo = function(){
        $scope.clips = [];
        $scope.playAble = null;
        $scope.originalVideoUrl = $scope.videoUrl;
        setTimeout(function(){
            $scope.playAble=$scope.videoUrl;
            $scope.$apply();
        }, 500);

        $scope.clips.push({
            name: "original",
            url: $scope.videoUrl
        });
    }

    $scope.clipVideo = function(){
        $http.get("/clip?startTime="+$scope.urlEncode($scope.startTime)+"&endTime="+
        $scope.urlEncode($scope.endTime)+"&url="+$scope.urlEncode($scope.originalVideoUrl))
        .then(function(response) {
            if($scope.currentActiveClip){
                $scope.clips[$scope.currentActiveClip] = {
                    name: $scope.clipName+" ("+$scope.startTime+"-"+$scope.endTime+")",
                    url: "/videos/"+response.data+".mp4"
                };
            }else{
                $scope.clips.push({
                    name: $scope.clipName+" ("+$scope.startTime+"-"+$scope.endTime+")",
                    url: "/videos/"+response.data+".mp4"
                });
            }
        });
    }

    $scope.urlEncode = function(data){
        return encodeURIComponent(data);
    }

    $scope.playClips = function(uuid,index){
        $scope.videoUrl = uuid;
        $scope.playAble = null;
        $scope.currentPlayIndex = index;

        if(index > 0){
            $scope.currentActiveClip = index;
        }else{
            $scope.currentActiveClip = null;
        }

        setTimeout(function(){
            $scope.playAble=$scope.videoUrl;
            $scope.$apply();
        }, 500);
    }

    $scope.deleteClip = function(index){
        $scope.clips.splice(index, 1);
        $scope.currentActiveClip = null;
    }

    $scope.leaveEditMode = function(){
        $scope.currentActiveClip = null;
    }

    $scope.playNext = function(){
        var index = $scope.currentPlayIndex;
        if($scope.clips.length > 1){
            document.querySelectorAll(".clip-index-"+(index+1))[0].click();
        }
    }
});