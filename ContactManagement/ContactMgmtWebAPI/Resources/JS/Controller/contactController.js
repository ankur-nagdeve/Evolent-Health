
contactApp.controller('contactController', ['$scope', 'contactService',

    function ($scope, contactService) {


        var baseUrl = '/api/RestAPI/ContactAPI/';
        $scope.btnText = "Save";
        
        $scope.contactID = 0;
        $scope.SaveUpdate = function () {            
            var contact = {
                FirstName: $scope.firstName,
                LastName: $scope.lasttName,
                Email: $scope.email,
                PhoneNumber: $scope.phoneNumber,
                Status: $scope.status? 1:0,
                ContactID: $scope.contactID
            }
            if ($scope.btnText == "Save") {
                var apiRoute = baseUrl + 'SaveContact/';
                var saveContact = contactService.post(apiRoute, contact);
                saveContact.then(function (response) {
                    if (response.data != "") {
                        alert("Contact Save Successfully.");
                        $scope.GetContacts();
                        $scope.Clear();

                    } else {
                        alert("Contact not Saved.");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
            else {
                var apiRoute = baseUrl + 'UpdateContact/';
                var UpdateContact = contactService.put(apiRoute, contact);
                UpdateContact.then(function (response) {
                    if (response.data != "") {
                        alert("Data Update Successfully");
                        $scope.GetContacts();
                        $scope.Clear();

                    } else {
                        alert("Contact not Updated.");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }


        $scope.GetContacts = function () {
            var apiRoute = baseUrl + 'GetContacts/';
            var contact = contactService.getAll(apiRoute);
            contact.then(function (response) {
                debugger
                $scope.contacts = response.data;
            },
            function (error) {
                console.log("Error: " + error);
            });


        }
        $scope.GetContacts();

        $scope.GetContactByID = function (dataModel) {
            debugger
            var apiRoute = baseUrl + 'GetContactByID';
            var contact = contactService.getbyID(apiRoute, dataModel.ContactID);
            contact.then(function (response) {
                $scope.contactID = response.data.ContactID;
                $scope.firstName = response.data.FirstName;
                $scope.lasttName = response.data.LastName;
                $scope.email = response.data.Email;
                $scope.phoneNumber = response.data.PhoneNumber;
                $scope.status = response.data.Status;
                $scope.btnText = "Update";
            },
            function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.DeleteContact = function (dataModel) {            
            var apiRoute = baseUrl + 'DeleteContact/' + dataModel.ContactID;
            var deleteContact = contactService.delete(apiRoute);
            deleteContact.then(function (response) {
                if (response.data != "") {
                    alert("Contact Deleted Successfully");
                    $scope.GetContacts();
                    $scope.Clear();

                } else {
                    alert("Contact Not Deleted");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.Clear = function () {
            $scope.contactID = 0;
            $scope.firstName = "";
            $scope.lasttName = "";
            $scope.email = "";
            $scope.phoneNumber = "";
            $scope.btnText = "Save";
        }
        
    }]);

contactApp.filter('checkmark', function () {
    return function (input) {
        return input ? 'Active' : 'InActive'; // If True then Tick. If False then Cross.
    };
});