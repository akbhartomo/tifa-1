angular.module('starter.controllers', [])

.controller('step1Ctrl', function($stateParams, $scope, Groups, $ionicTabsDelegate, $http, $ionicPopup) {
  
  console.log('$stateParams');
  console.log($stateParams);
  
  userId = parseInt($stateParams.userId);
  token = $stateParams.token;
  
  if ($stateParams.token == "true" || $stateParams.token == "" || $stateParams.token == undefined){
    $ionicPopup.alert({
      title: 'Error',
      template: 'Token is null!',
      buttons: [
        {
          text: '<b>Back</b>',
          type: 'button-positive',
          onTap: function(e) {
            window.location.href = formBaseUrl + "done";
            return true;
          }
        },
      ]
    });
  }
  
  angular.element(document).ready(function () {
    console.log('ready.');
    if (!inputFormData.length)
      $http.post(baseUrl + 'customer/inquireCustomerData', 
      { 
        "userId": userId,
        "token" : token,
      }, { headers: { 'Content-Type': 'application/json'} })
      .then(function(data) {
        console.log(data.data);
        data = data.data;
        angular.forEach(data, function(value, key){
          /*
          if (angular.element(document.querySelector('[name="'+ key +'"]')).length){
            console.log(key);
            console.log(angular.element(document.querySelector('[name="'+ key +'"]')));
          }
          */
          if (value!= null) angular.element(document.querySelector('[name="'+ key +'"]')).val(value);
          
        });
        
      }, function(data){
        $ionicPopup.alert({
          title: 'Error!',
          template: 'Tidak tersambung ke mentimun-tifa-service.'
        });
      });
  });
  
  $scope.group1 = Groups.group1();

  // Function for dot separate NPWP Number
  // $scope.dotSeparator = function() {
  //   angular.element(document.querySelector("[name=typeNumberNPWP]")).val(angular.element(document.querySelector("[name=typeNumberNPWP]")).val().toString().replace(/,/g, ".").replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  // }

  // $scope.inputNPWP = function() {
  //   $scope.dotSeparator();

  //   parseInt(angular.element(document.querySelector("[name=typeNumberNPWP]")).val().replace(/,/g, "."))
  // }
    
  $scope.validate = function (item) {
    validate(item);
  }
  
  $scope.validateOtherItem = function (item, nonNullItemName, whenValue) {
    validateOtherItem(item, nonNullItemName, whenValue);
  }
  
  $scope.saveData =  function (callback) {
    var selectEmpty = false;
    if (angular.element(document.querySelector('.validation-info')).length > 0){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Silakan periksa kembali input anda.',
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function(e) {
              return;
            }
          },
        ]
      });
    } else {
      console.log("Group1 validated.");
      angular.forEach(Groups.group1(), function(value, key){
        if (value.name!= undefined){
          inputFormData[value.name]=angular.element( document.querySelector("[name="+ value.name +"]")).val();
          if ( value.name !== 'spouseName' &&
            (
              inputFormData[value.name] ==='? undefined:undefined ?' || inputFormData[value.name] === '' || inputFormData[value.name] === '?' || inputFormData[value.name] === undefined
            )
          ){
            selectEmpty = true;
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Silakan periksa kembali input anda. <br/> ('+ value.label +' tidak boleh kosong!)',
              buttons: [
                {
                  text: '<b>OK</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return;
                  }
                },
              ]
            });
          }
        }
      });
      if (!selectEmpty) typeof(callback)=='function'?callback():'';
    }
  }
  
  $scope.goForward = function () {
    validateAll();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
          $ionicTabsDelegate.select(selected + 1);
      }
    });
  }
  
  $scope.goBack = function () {
    hideAllValidationInfo();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
          $ionicTabsDelegate.select(selected - 1);
      }
    });
  }
})

/* 
    End Controller  Step 1
====================================================== */
 

.controller('step2Ctrl', function($scope, Groups, $ionicTabsDelegate, $http, $ionicPopup) {
  if (userId === 0 || token === 0){
    $ionicPopup.alert({
      title: 'Error!',
      template: 'userId atau token invalid.',
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function(e) {
            window.location.href = formBaseUrl + "data-karyawan?token&userId";
          }
        },
      ]
    });
  }
  
  $scope.group2 = Groups.group2();
  
  $scope.updateState = function () {
    $http.post(restAPIUrl + 'address/state', 
    { "code": "ID"}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data = {};
        $scope.data.province = [];
        angular.forEach(data.listAddressStates, function(value, key){
          $scope.data.province.push(
            {
              id: value.stateCode,
              name: value.stateName,
            }
          )
        });
      $scope.updateDomisili();
    }).error(function(data, status, headers, config) {
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Tidak tersambung ke rest-api.'
      });
    });
  }
  
  $scope.data = {};
  $scope.updateState();
  
  $scope.updateCity = function () {
    var selectedProvince = angular.element(document.querySelector('#selectedProvince')).val();
    console.log(selectedProvince);
    $http.post(restAPIUrl + 'address/city', 
    { "code": selectedProvince}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.city = [];
        angular.forEach(data.listAddressCities, function(value, key){
          $scope.data.city.push(
            {
              id: value.cityCode,
              name: value.cityName,
            }
          )
        });
        //angular.element(document.querySelector('#selectedCity')).val(kota);
    }).error(function(data, status, headers, config) {
      //error city
    });
  }
  
  $scope.updateDistrict = function () {
    var selectedCity = angular.element(document.querySelector('#selectedCity')).val();
    console.log(selectedCity);
    $http.post(restAPIUrl + 'address/district', 
    { "code": selectedCity}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.district = [];
        angular.forEach(data.listAddressDistricts, function(value, key){
          $scope.data.district.push(
            {
              id: value.districtCode,
              name: value.districtName,
            }
          )
        });
    }).error(function(data, status, headers, config) {
      //error district
    });
  }

  $scope.updateSubdistrict = function () {
    var selectedDistrict = angular.element(document.querySelector('#selectedDistrict')).val();
    console.log(selectedDistrict);
    $http.post(restAPIUrl + 'address/subDistrict', 
    { "code": selectedDistrict}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.subdistrict = [];
        angular.forEach(data.listAddressSubDistricts, function(value, key){
          $scope.data.subdistrict.push(
            {
              id: value.subDistrictCode,
              name: value.subDistrictName,
            }
          )
        });
    }).error(function(data, status, headers, config) {
      //error subdistrict
    });
  }

  $scope.updateZipcode = function () {
    var selectedDistrict = angular.element(document.querySelector('#selectedDistrict')).val();
    console.log(selectedDistrict);
    $http.post(restAPIUrl + 'address/zipCode', 
    { "code": selectedDistrict}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.zipcode = [];
        angular.forEach(data.listAddressZipCodes, function(value, key){
          $scope.data.zipcode.push(
            {
              id: value.zipCode,
              name: value.zipCode,
            }
          )
        });
    }).error(function(data, status, headers, config) {
      //error subdistrict
    });
  }
  
  $scope.updateDomisili = function () {
    $http.post(baseUrl + 'customer/inquireCustomerData', 
    { 
      "userId": userId,
      "token" : token,
   }, { headers: { 'Content-Type': 'application/json'} })
    .success(function(data, status, headers, config) {
        angular.forEach(data, function(value, key){
          var scopeData = [];
          angular.forEach($scope.group2, function(value, key){ scopeData.push(value.name); });
          if (scopeData.indexOf(key) > -1 && inputFormData[key] === undefined ) {
            if (value!= null) angular.element(document.querySelector('[name="'+ key +'"]')).val(value);
            if (key=='domisiliKota' && value!= null && value!= '') {
              angular.element(document.querySelector('#selectedCity')).append('<option value='+ value +' selected>'+data.domisiliKotaName+'</option>');
            }
            if (key=='domisiliKecamatan' && value!= null && value!= '') {
              angular.element(document.querySelector('#selectedDistrict')).append('<option value='+ value +' selected>'+data.domisiliKecamatanName+'</option>');
            }
            if (key=='domisiliKelurahan' && value!= null && value!= '') {
              angular.element(document.querySelector('#selectedSubdistrict')).append('<option value='+ value +' selected>'+data.domisiliKelurahanName+'</option>');
            }
            if (key=='domisiliZipCode' && value!= null && value!= '') {
              angular.element(document.querySelector('#selectedZipcode')).append('<option value='+ value +' selected>'+data.domisiliZipCode+'</option>');
            }
            /*
            if (key=='domisiliProvinsi' && value!= null && value!= ''){
              angular.element(document.querySelector('#selectedProvince')).val(value);
              if (data.domisiliKota != null && data.domisiliKota != ''){
                $scope.updateCity(data.domisiliKota);
                if (data.domisiliKecamatan != null && data.domisiliKecamatan != ''){
                  $scope.updateDistrict();
                  angular.element(document.querySelector('#selectedDistrict')).val(data.domisiliKecamatan);
                  if (data.domisiliKelurahan != null && data.domisiliKelurahan != ''){
                    $scope.updateSubdistrict();
                    angular.element(document.querySelector('#selectedSubdistrict')).val(data.domisiliKelurahan);
                    if (data.domisiliZipCode != null && data.domisiliZipCode != ''){
                      $scope.updateZipcode();
                      angular.element(document.querySelector('#selectedZipcode')).val(data.domisiliZipCode);
                    }
                  }
                }
              }
            }
            */
          }
        });
    }).error(function(data, status, headers, config) {
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Tidak tersambung ke mentimun-tifa-service.'
      });
    });
  }
  
  $scope.validate = function (item) {
    validate(item);
  }
  
  //Function saveData()
  $scope.saveData =  function (callback) {
    var selectEmpty = false;
    if (angular.element(document.querySelector('.validation-info')).length > 0){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Silakan periksa kembali input anda.',
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function(e) {
              return;
            }
          },
        ]
      });
    } else {
      console.log("Group2 validated.");
      angular.forEach(Groups.group2(), function(value, key){
        if (value.name!= undefined){
          inputFormData[value.name]=angular.element( document.querySelector("[name="+ value.name +"]")).val();
          if (inputFormData[value.name] ==='? undefined:undefined ?' || inputFormData[value.name] === '' || inputFormData[value.name] === '?' || inputFormData[value.name] === undefined){
            selectEmpty = true;
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Silakan periksa kembali input anda. <br/> ('+ value.label +' tidak boleh kosong!)',
              buttons: [
                {
                  text: '<b>OK</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return;
                  }
                },
              ]
            });
          }
        }
      });
      if (!selectEmpty) typeof(callback)=='function'?callback():'';
    }
  }
  
  //Function goForward()
  $scope.goForward = function () {
    validateAll();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
          $ionicTabsDelegate.select(selected + 1);
      }
    });
  }

  //Function goBack()
  $scope.goBack = function () {
    hideAllValidationInfo();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
          $ionicTabsDelegate.select(selected - 1);
      }
    });
  }  
})

/* 
    End Controller  Step 2
====================================================== */

.controller('step3Ctrl', function($scope, Groups, $ionicTabsDelegate, $http, $ionicPopup) {
  if (userId === 0 || token === 0){
    $ionicPopup.alert({
      title: 'Error!',
      template: 'userId atau token invalid.',
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function(e) {
            window.location.href = formBaseUrl + "data-karyawan?token&userId";
          }
        },
      ]
    });
  }
  
  $scope.group3 = Groups.group3();
  
  $scope.updateState = function () {
    $http.post(restAPIUrl + 'address/state', 
    { "code": "ID"}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data = {};
        $scope.data.province = [];
        angular.forEach(data.listAddressStates, function(value, key){
          $scope.data.province.push(
            {
              id: value.stateCode,
              name: value.stateName,
            }
          )
        });
      //$scope.updateDomisili();
    }).error(function(data, status, headers, config) {
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Tidak tersambung ke rest-api.'
      });
    });
  }
  
  $scope.data = {};
  $scope.updateState();
  
  $scope.updateCity = function () {
    angular.element(document.querySelector('[name="companyProvince"]')).next().remove();
    var selectedProvince = angular.element(document.querySelector('#selectedCompanyProvince')).val();
    console.log(selectedProvince);
    $http.post(restAPIUrl + 'address/city', 
    { "code": selectedProvince}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.city = [];
        angular.forEach(data.listAddressCities, function(value, key){
          $scope.data.city.push(
            {
              id: value.cityCode,
              name: value.cityName,
            }
          )
        });
        //angular.element(document.querySelector('#selectedCity')).val(kota);
    }).error(function(data, status, headers, config) {
      //error city
    });
  }
  
  $scope.updateDistrict = function () {
    angular.element(document.querySelector('[name="companyCity"]')).next().remove();
    var selectedCity = angular.element(document.querySelector('#selectedCompanyCity')).val();
    console.log(selectedCity);
    $http.post(restAPIUrl + 'address/district', 
    { "code": selectedCity}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.district = [];
        angular.forEach(data.listAddressDistricts, function(value, key){
          $scope.data.district.push(
            {
              id: value.districtCode,
              name: value.districtName,
            }
          )
        });
    }).error(function(data, status, headers, config) {
      //error district
    });
  }

  $scope.updateSubdistrict = function () {
    angular.element(document.querySelector('[name="companyDistrict"]')).next().remove();
    var selectedDistrict = angular.element(document.querySelector('#selectedCompanyDistrict')).val();
    console.log(selectedDistrict);
    $http.post(restAPIUrl + 'address/subDistrict', 
    { "code": selectedDistrict}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.subdistrict = [];
        angular.forEach(data.listAddressSubDistricts, function(value, key){
          $scope.data.subdistrict.push(
            {
              id: value.subDistrictCode,
              name: value.subDistrictName,
            }
          )
        });
    }).error(function(data, status, headers, config) {
      //error subdistrict
    });
  }

  $scope.updateZipcode = function () {
    angular.element(document.querySelector('[name="companySubdistrict"]')).next().remove();
    var selectedDistrict = angular.element(document.querySelector('#selectedCompanyDistrict')).val();
    console.log(selectedDistrict);
    $http.post(restAPIUrl + 'address/zipCode', 
    { "code": selectedDistrict}, { headers: { 'Content-Type': 'application/json' } })
    .success(function(data, status, headers, config) {
        $scope.data.zipcode = [];
        angular.forEach(data.listAddressZipCodes, function(value, key){
          $scope.data.zipcode.push(
            {
              id: value.zipCode,
              name: value.zipCode,
            }
          )
        });
    }).error(function(data, status, headers, config) {
      //error subdistrict
    });
  }

  
  $scope.validateZipcode = function () {
    angular.element(document.querySelector('[name="companyZipcode"]')).next().remove();
  }
  /*
  $scope.updateDomisili = function () {
    $http.post(baseUrl + 'customer/inquireCustomerData', 
    { "userId": userId,
    "token" : token,
   }, { headers: { 'Content-Type': 'application/json'} })
    .success(function(data, status, headers, config) {
        angular.forEach(data, function(value, key){
          if (value!= null) angular.element(document.querySelector('[name="'+ key +'"]')).val(value);
          if (key=='domisiliKota' && value!= null && value!= '') {
            angular.element(document.querySelector('#selectedCompanyCity')).append('<option value='+ value +' selected>'+data.domisiliKotaName+'</option>');
          }
          if (key=='domisiliKecamatan' && value!= null && value!= '') {
            angular.element(document.querySelector('#selectedCompanyDistrict')).append('<option value='+ value +' selected>'+data.domisiliKecamatanName+'</option>');
          }
          if (key=='domisiliKelurahan' && value!= null && value!= '') {
            angular.element(document.querySelector('#selectedCompanySubdistrict')).append('<option value='+ value +' selected>'+data.domisiliKelurahanName+'</option>');
          }
          if (key=='domisiliZipCode' && value!= null && value!= '') {
            angular.element(document.querySelector('#selectedCompanyZipcode')).append('<option value='+ value +' selected>'+data.domisiliZipCode+'</option>');
          }
        });
    }).error(function(data, status, headers, config) {
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Tidak tersambung ke mentimun-tifa-service.'
      });
    });
  }
  */
  
  // Form 3 Send to Server
  $http.post(baseUrl + 'customer/inquireCustomerData', 
  { "userId": userId,
    "token" : token,
   }, { headers: { 'Content-Type': 'application/json'} })
  .success(function(data, status, headers, config) {
      var scopeData = [];
      angular.forEach($scope.group3, function(value, key){ scopeData.push(value.name); });
        angular.forEach(data, function(value, key){
          if (scopeData.indexOf(key) > -1 && inputFormData[key] === undefined )
            if (value!== null) 
              angular.element(document.querySelector('[name="'+ key +'"]')).val(value);
        });
  }).error(function(data, status, headers, config) {
    $ionicPopup.alert({
      title: 'Error!',
      template: 'Tidak tersambung ke mentimun-tifa-service.'
    });
  });
  
  $scope.validate = function (item) {
    validate(item);
  }
  
  angular.forEach(angular.element(document.querySelectorAll('select')), function(value,key){
    validate(value);
  });

  $scope.validateOtherItem = function (item, nonNullItemName, whenValue) {
    validateOtherItem(item, nonNullItemName, whenValue);
  }
  
  $scope.saveData =  function (callback) {
    angular.forEach(angular.element(document.querySelectorAll('select')), function(value,key){
      console.log(value);
      validate(value);
    });

    // validate errors
    var selectEmpty = false;
    if (angular.element(document.querySelector('.validation-info')).length > 0){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Silakan periksa kembali input anda.',
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function(e) {
              return;
            }
          },
        ]
      });
    } else {
      console.log("Group3 validated.");
      angular.forEach(Groups.group3(), function(value, key){
        if (value.name!= undefined){
          inputFormData[value.name]=angular.element( document.querySelector("[name="+ value.name +"]")).val();
          if (inputFormData[value.name] ==='? undefined:undefined ?' || inputFormData[value.name] === '' || inputFormData[value.name] === '?' || inputFormData[value.name] === undefined){
            selectEmpty = true;
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Silakan periksa kembali input anda. <br/> ('+ value.label +' tidak boleh kosong!)',
              buttons: [
                {
                  text: '<b>OK</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return;
                  }
                },
              ]
            });
          }
        }
      });
      if (!selectEmpty) typeof(callback)=='function'?callback():'';
    }
  }
  
  $scope.goForward = function () {
    validateAll();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
          $ionicTabsDelegate.select(selected + 1);
      }
    });
  }
  
  $scope.goBack = function () {
    hideAllValidationInfo();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
          $ionicTabsDelegate.select(selected - 1);
      }
    });
  }
})

/* 
    End Controller  Step 3
====================================================== */

.controller('step4Ctrl', function($scope, Groups, $ionicTabsDelegate, $http, $ionicPopup) {
  if (userId === 0 || token === 0){
    $ionicPopup.alert({
      title: 'Error!',
      template: 'userId atau token invalid.',
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function(e) {
            window.location.href = formBaseUrl + "data-karyawan?token&userId";
          }
        },
      ]
    });
  }
  
  $scope.group4 = Groups.group4();
  
  $http.post(baseUrl + 'customer/inquireCustomerData', {"userId": userId, "token" : token,}, {headers: { 'Content-Type': 'application/json'} })
  .success(function(data, status, headers, config) {
    var scopeData = [];
    angular.forEach($scope.group4, function(value, key){ scopeData.push(value.name); });
    angular.forEach(data, function(value, key){
      if (scopeData.indexOf(key) > -1 && inputFormData[key] === undefined )
        if (value!== null && key !=='totalProductPrice' && key !== 'totalLoan') 
          angular.element(document.querySelector('[name="'+ key +'"]')).val(value);
    });
  }).error(function(data, status, headers, config) {
    $ionicPopup.alert({
      title: 'Error!',
      template: 'Tidak tersambung ke mentimun-tifa-service.'
    });
  });

  


  $scope.commaSeparate = function () {
    angular.element( document.querySelector("[name=totalProductPrice]")).val( angular.element( document.querySelector("[name=totalProductPrice]")).val().toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    angular.element( document.querySelector("[name=totalLoan]")).val( angular.element( document.querySelector("[name=totalLoan]")).val().toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    //angular.element(document.querySelector('[name="installmentPeriod"][value=0]')).attr('selected','selected');
    
    //$(this).val(x.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    
    //angular.element( document.querySelector("#totalProductPrice")).html(parseInt(angular.element( document.querySelector("[name='totalProductPrice']")).val()).formatMoney(2, '.', ','));
    //angular.element( document.querySelector("#totalLoan")).html(parseInt(angular.element( document.querySelector("[name='totalLoan']")).val()).formatMoney(2, '.', ','));
  }

  $scope.calcPriceTifa = function () {
    $scope.commaSeparate();

    //Function untuk input dana yang ingin dipinjam tidak melebihi harga barang --------
    if (parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, "") ) > parseInt(angular.element( document.querySelector("[name='totalProductPrice']")).val().replace(/,/g, "")) ){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Jumlah dana yang dibutuhkan tidak boleh melebihi Harga Barang/jasa.'
      });
      angular.element( document.querySelector("[name='totalLoan']")).val( parseInt(angular.element( document.querySelector("[name='totalProductPrice']")).val()));
    }
    
    //Function untuk input dana yang ingin dipinjam minimal 2,000,000 --------
    if ((parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, "") ) < 2000000) && 
    (parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, "")) !== 0) ){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Jumlah dana yang dibutuhkan harus minimal 2.000.000.'
      });
      angular.element( document.querySelector("[name='totalLoan']")).val('');
    }
    
    //Function untuk input dana yang ingin dipinjam maksimal 200,000,000 --------
    if ((parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, "") ) > 200000000) && 
    (parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, "")) !== 0) ){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Jumlah dana yang dibutuhkan harus maksimal 200.000.000.'
      });
      angular.element( document.querySelector("[name='totalLoan']")).val('');
    }
    
    //Function untuk input dana yang ingin dipinjam harus kelipatan 1,000,000 --------
    if ((parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, "") ) % 1000000 !== 0) && 
    (parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, "")) !== 0) ){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Jumlah dana yang dibutuhkan harus kelipatan 1.000.000.'
      });
      angular.element( document.querySelector("[name='totalLoan']")).val('');
    }
    
    var installPeriod = parseInt(angular.element( document.querySelector("[name=installmentPeriod]")).val());
    if (isNaN(installPeriod)) return;

    //Form 4 Send to server 
    $http.post(baseUrl + 'customer/inquirePriceTifa', 
    { 
      "totalLoan": parseInt(angular.element( document.querySelector("[name=totalLoan]")).val().replace(/,/g, "")),
      "installmentPeriod": isNaN(installPeriod) ? 0 : installPeriod,
      "supplierLoan": parseInt(angular.element(document.querySelector("[name=productSupplier]")).val()),
      "cooperativeTifaId": 1 

    }, { headers: { 'Content-Type': 'application/json'} })

    .success(function(data, status, headers, config) {

      if (data.profitMargin != null) angular.element(document.querySelector('[name=profitMargin]')).val(data.profitMargin.formatMoney(2, '.', ','));
      if (data.installmentAmount != null) angular.element(document.querySelector('[name=installmentAmount]')).val(data.installmentAmount.formatMoney(2, '.', ','));
      if (data.installmentAdminFee != null) angular.element(document.querySelector('[name=installmentAdminFee]')).val(data.installmentAdminFee.formatMoney(2, '.', ','));
      
      inputFormData.profitMargin = parseInt(data.profitMargin);
      inputFormData.installmentAmount = parseInt(data.installmentAmount);
      inputFormData.installmentAdminFee = parseInt(data.installmentAdminFee);      
      inputFormData.interestRate = parseInt(data.interestRate);

      if ((angular.element(document.querySelector('[name=productSupplier]')).val()) && (angular.element(document.querySelector('[name=installmentPeriod]')).val()==='12')){
        // console.log(angular.element(document.querySelector('[name='+corporateName+']')).val());   
        inputFormData.interestRate = angular.element(document.querySelector('[name=interestRate]')).val(parseFloat(data.interestRate));   
        // inputFormData.interestRate = parseInt(data.interestRate);
      }      
      if ((angular.element(document.querySelector('[name=productSupplier]')).val()) && (angular.element(document.querySelector('[name=installmentPeriod]')).val()==='24')){
        // console.log(angular.element(document.querySelector('[name='+corporateName+']')).val());
        inputFormData.interestRate = angular.element(document.querySelector('[name=interestRate]')).val(parseFloat(data.interestRate));
        // inputFormData.interestRate = parseInt(data.interestRate);
      }
      if ((angular.element(document.querySelector('[name=productSupplier]')).val()) && (angular.element(document.querySelector('[name=installmentPeriod]')).val()==='36')){
        // console.log(angular.element(document.querySelector('[name='+corporateName+']')).val());
        inputFormData.interestRate = angular.element(document.querySelector('[name=interestRate]')).val(parseFloat(data.interestRate));
        // inputFormData.interestRate = parseInt(data.interestRate);
      }  

    }).error(function(data, status, headers, config) {
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Tidak tersambung ke mentimun-tifa-service.'
      }); 
    });

  }
  
  $scope.validate = function (item) {
    validate(item);
  }
  
  $scope.validateOtherItem = function (item, nonNullItemName, whenValue) {
    validateOtherItem(item, nonNullItemName, whenValue);
  }
  
  $scope.selectUpdate = function (itemName){
    if (itemName ==='productSupplier'){
      console.log(angular.element(document.querySelector('[name='+itemName+']')).val());
      if (angular.element(document.querySelector('[name='+itemName+']')).val()==='1001'){
        //console.log(angular.element(document.querySelector('[name='+itemName+']')).val());
        inputFormData.supplierBankName = 'Bank Syariah Mandiri';
        inputFormData.supplierBankAcountNumber = '0740027129';
        inputFormData.supplierBankAccountName = 'Koperasi Karlina PT Berlina Tbk';
      }
      if (angular.element(document.querySelector('[name='+itemName+']')).val()==='1002'){
        //console.log(angular.element(document.querySelector('[name='+itemName+']')).val());
        inputFormData.supplierBankName = 'Bank BNI';
        inputFormData.supplierBankAcountNumber = '8824202021';
        inputFormData.supplierBankAccountName = 'Koperasi A';
      }
      if (angular.element(document.querySelector('[name='+itemName+']')).val()==='1003'){
        //console.log(angular.element(document.querySelector('[name='+itemName+']')).val());
        inputFormData.supplierBankName = 'Bank BCA';
        inputFormData.supplierBankAcountNumber = '1102402829';
        inputFormData.supplierBankAccountName = 'Koperasi B';
      }
      if (angular.element(document.querySelector('[name='+itemName+']')).val()==='1004'){
        //console.log(angular.element(document.querySelector('[name='+itemName+']')).val());
        inputFormData.supplierBankName = 'Bank Mandiri';
        inputFormData.supplierBankAcountNumber = '059033302930';
        inputFormData.supplierBankAccountName = 'Koperasi C';
      }
    }
  }  
  
  $scope.saveData =  function (callback) {
    // validate errors
    var selectEmpty = false;
    if (angular.element(document.querySelector('.validation-info')).length > 0){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Silakan periksa kembali input anda.',
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function(e) {
              return;
            }
          },
        ]
      });
    } else {
      console.log("Group4 validated.");
      angular.forEach(Groups.group4(), function(value, key){
        if (value.name!= undefined && !(value.name==='profitMargin' || value.name==='installmentAmount' || value.name==='installmentAdminFee' || value.name==='ratePercentage')){
          inputFormData[value.name]=angular.element( document.querySelector("[name="+ value.name +"]")).val();
          if (inputFormData[value.name] ==='? undefined:undefined ?' || inputFormData[value.name] === '' || inputFormData[value.name] === '?' || inputFormData[value.name] === undefined){
            selectEmpty = true;
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Silakan periksa kembali input anda. <br/> ('+ value.label +' tidak boleh kosong!)',
              buttons: [
                {
                  text: '<b>OK</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return;
                  }
                },
              ]
            });
          }
        }
        inputFormData.totalLoan = parseInt(angular.element( document.querySelector("[name='totalLoan']")).val().replace(/,/g, ""));
        inputFormData.totalProductPrice = parseInt(angular.element( document.querySelector("[name='totalProductPrice']")).val().replace(/,/g, ""));
        //inputFormData.ratePercentage = parseInt(angular.element(document.querySelector("[name='ratePercentage']")).val().replace(/[,%]/g,""));

      });

      if (!selectEmpty) typeof(callback)=='function'?callback():'';
    }
  }
  
  $scope.goForward = function () {
    validateAll();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
          $ionicTabsDelegate.select(selected + 1);
      }
    });
  }
  
  $scope.goBack = function () {
    hideAllValidationInfo();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
          $ionicTabsDelegate.select(selected - 1);
      }
    });
  }
})

/* 
    End Controller  Step 4
====================================================== */

.controller('step5Ctrl', function($scope, Groups, $ionicTabsDelegate, $http, $ionicPopup) {
  $scope.ketentuanUrl = formBaseUrl + "ketentuan";
  $scope.ketentuan = ketentuan;
  
  if (userId === 0 || token === 0){
    $ionicPopup.alert({
      title: 'Error!',
      template: 'userId atau token invalid.',
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function(e) {
            window.location.href = formBaseUrl + "data-karyawan?token&userId";
          }
        },
      ]
    });
  }
  
  $scope.group5 = Groups.group5();
  
  $http.post(baseUrl + 'customer/inquireCustomerData', 
  { "userId": userId,
    "token" : token,
   }, { headers: { 'Content-Type': 'application/json'} })
  .success(function(data, status, headers, config) {
    var scopeData = [];
    angular.forEach($scope.group5, function(value, key){ scopeData.push(value.name); });
    angular.forEach(data, function(value, key){
      if (scopeData.indexOf(key) > -1 && inputFormData[key] === undefined )
        if (value!= null) angular.element(document.querySelector('[name="'+ key +'"]')).val(value);
    });
    angular.element(document.querySelector('[name=supplierBankName]')).val(inputFormData.supplierBankName);
    angular.element(document.querySelector('[name=supplierBankAcountNumber]')).val(inputFormData.supplierBankAcountNumber);
    angular.element(document.querySelector('[name=supplierBankAccountName]')).val(inputFormData.supplierBankAccountName);
  }).error(function(data, status, headers, config) {
    $ionicPopup.alert({
      title: 'Error!',
      template: 'Tidak tersambung ke mentimun-tifa-service.'
    });
  });
  
  $scope.validate = function (item) {
    if ( ( angular.element(document.querySelector('[name=supplierBankAccountName]')).val()=== inputFormData.fullName && inputFormData.fullName !== '' )
      || ( angular.element(document.querySelector('[name=supplierBankAccountName]')).val()=== inputFormData.spouseName && inputFormData.spouseName !== '' ) ){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Nama tidak boleh sama dengan nama Customer/Pasangan!'
      });
      angular.element( document.querySelector("[name='supplierBankAccountName']")).val('');
      return;
    } else {
      validate(item);
      angular.element(document.querySelector('[name=supplierBankName]')).val(inputFormData.supplierBankName);
      angular.element(document.querySelector('[name=supplierBankAcountNumber]')).val(inputFormData.supplierBankAcountNumber);
      angular.element(document.querySelector('[name=supplierBankAccountName]')).val(inputFormData.supplierBankAccountName);
    }
  }
  
  $scope.validateOtherItem = function (item, nonNullItemName, whenValue) {
    validateOtherItem(item, nonNullItemName, whenValue);
  }
  
  $scope.saveData =  function (callback) {
    // validate errors
    var selectEmpty = false;
    if (angular.element(document.querySelector('.validation-info')).length > 0){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Silakan periksa kembali input anda.',
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function(e) {
              return;
            }
          },
        ]
      });
    } else {
      console.log("Group5 validated.");
      angular.forEach(Groups.group5(), function(value, key){
        if (value.name!= undefined){
          inputFormData[value.name]=angular.element( document.querySelector("[name="+ value.name +"]")).val();
          if (inputFormData[value.name] ==='? undefined:undefined ?' || inputFormData[value.name] === '' || inputFormData[value.name] === '?' || inputFormData[value.name] === undefined){
            selectEmpty = true;
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Silakan periksa kembali input anda. <br/> ('+ value.label +' tidak boleh kosong!)',
              buttons: [
                {
                  text: '<b>OK</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return;
                  }
                },
              ]
            });
          }
        }
      });
      if (!selectEmpty) typeof(callback)=='function'?callback():'';
    }
  }
  
  $scope.goForward = function () {
    //validateAll();
    /*
    if ( ( angular.element(document.querySelector('[name=supplierBankAccountName]')).val()=== inputFormData.fullName && inputFormData.fullName !== '' )
      || ( angular.element(document.querySelector('[name=supplierBankAccountName]')).val()=== inputFormData.spouseName && inputFormData.spouseName !== '' ) ){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Nama tidak boleh sama dengan nama Customer/Pasangan!'
      });
      angular.element( document.querySelector("[name='supplierBankAccountName']")).val('');
      return;
    }
    */
    
    if (!angular.element(document.querySelector('[name=ketentuan]')).prop('checked')){
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Mohon baca dan setuju dengan syarat dan ketentuan.',
      });
      return;
    }
    
    $scope.saveData( function(){
      inputFormData.userId = userId;
      inputFormData.token = token;
      
      if (inputFormData.countOfFamilyOrExpense === undefined || inputFormData.countOfFamilyOrExpense === '' || inputFormData.countOfFamilyOrExpense === null) inputFormData.countOfFamilyOrExpense = 0;
      
      console.log(JSON.stringify(inputFormData));
      $http.post(baseUrl + 'customer/modifyCustomerData', inputFormData, { headers: { 'Content-Type': 'application/json'} })
      .success(function(data, status, headers, config) {
        if (data.responseStatus == 1){
          $ionicPopup.alert({
            title: 'Berhasil!',
            template: 'Order Anda telah berhasil dilakukan.',
            buttons: [
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                  window.location.href = formBaseUrl + "done";
                  return true;
                }
              },
            ]
          });
        } else {
          $ionicPopup.alert({
            title: 'Error!',
            template: 'Silakan periksa kembali input anda ('+ data.responseMessage +')',
            buttons: [
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                  //window.history.back();
                  //window.history.back();
                  //window.history.back();
                  //window.history.back();
                  //window.location.href = formBaseUrl + "data-karyawan";
                  return true;
                }
              },
            ]
          });
        }
      }).error(function(data, status, headers, config) {
        $ionicPopup.alert({
          title: 'Error!',
          template: 'Tidak tersambung ke mentimun-tifa-service.'
        })
      });
    });
  }
  
  $scope.goBack = function () {
    hideAllValidationInfo();
    $scope.saveData( function(){
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
          $ionicTabsDelegate.select(selected - 1);
      }
    });
  }
})

/* 
    End Controller  Step 5
====================================================== */

.controller('ketentuanCtrl', function($scope, Groups, $ionicTabsDelegate, $http, $ionicPopup) {
  console.log(inputFormData);
  $scope.setuju = function () {
    ketentuan = true;
    angular.element(document.querySelector('[name=ketentuan]')).prop('checked','checked');
    window.history.back();
  }
})
;

function validate(item) {
    var itemDOM = angular.element(document.querySelector('[name="'+ item.name +'"]'));
    itemDOM.next().remove();
    
    if ( !itemDOM.val() ){ // kalau kosong
      if (!( item.name === 'spouseName' && (angular.element(document.querySelector('[name="maritalStatus"]')).val()=== 'S' || angular.element(document.querySelector('[name="maritalStatus"]')).val()=== 'D' ))){
        itemDOM.next().remove(); // hapus validation-info nya dulu
        itemDOM.parent().append('<span class="validation-info"><span class="ion-alert-circled"></span>&nbsp;Kolom ini tidak boleh kosong<span>');
        return;
      }
    }
    
    if ( item.type==='number' && isNaN(parseInt(itemDOM.val())) ){
      itemDOM.next().remove();
      itemDOM.parent().append('<span class="validation-info"><span class="ion-alert-circled"></span>&nbsp;Kolom ini tidak boleh kosong<span>');
      return;
    }
    
    if (itemDOM.val()==='?'){
      itemDOM.next().remove();
      itemDOM.parent().append('<span class="validation-info"><span class="ion-alert-circled"></span>&nbsp;Kolom ini tidak boleh kosong<span>');
      return;
    }
    
    if ( item.type==='email' && !validateEmail(itemDOM.val()) ){
      itemDOM.next().remove();
      itemDOM.parent().append('<span class="validation-info"><span class="ion-alert-circled"></span>&nbsp;Email tidak valid<span>');
      return;
    }
    
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function validateOtherItem(item, nonNullItemName, whenValue) {
  validate(item);
  
  if (nonNullItemName===undefined || whenValue===undefined) return;
  var itemDOM = angular.element(document.querySelector('[name="'+item.name+'"]'));
  var nonNullItemDOM = angular.element(document.querySelector('[name="'+nonNullItemName+'"]'));
  nonNullItemDOM.next().remove();
  if ( (!nonNullItemDOM.val()) && whenValue.indexOf(itemDOM.val())>=0 ){
    nonNullItemDOM.next().remove();
    nonNullItemDOM.parent().append('<span class="validation-info"><span class="ion-alert-circled"></span>&nbsp;Kolom ini tidak boleh kosong<span>');
    return;
  }
}

function validateAll(){
  angular.forEach(angular.element(document.querySelectorAll('input')), function(value,key){
    if (isVisible(value)){
      if (value.name !== 'countOfFamilyOrExpense')
        validate(value);
    }
  });
}

function hideAllValidationInfo(){
  angular.forEach(angular.element(document.querySelectorAll('.validation-info')), function(value,key){
    value.remove();
  });
}

function isVisible(elem) {
  return (elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0)
}

window.onhashchange = function() {
  hideAllValidationInfo();
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

 // function formatPercent(context, options) {
 //    var fixed = options.hash.fixed || 2;
 //    return (context * 100).toFixed(fixed) + '%';
 // }
 
