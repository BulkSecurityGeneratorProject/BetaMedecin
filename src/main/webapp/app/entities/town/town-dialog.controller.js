(function() {
    'use strict';

    angular
        .module('betaMedecinApp')
        .controller('TownDialogController', TownDialogController);

    TownDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Town', 'Quarter'];

    function TownDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Town, Quarter) {
        var vm = this;

        vm.town = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.quarters = Quarter.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.town.id !== null) {
                Town.update(vm.town, onSaveSuccess, onSaveError);
            } else {
                Town.save(vm.town, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('betaMedecinApp:townUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setImage = function ($file, town) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        town.image = base64Data;
                        town.imageContentType = $file.type;
                    });
                });
            }
        };

    }
})();
