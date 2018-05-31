# PTS
<!-- *******************************
*MFE*
******************************* -->

HOSPITAL ROUTES
<!-- ************************** -->

CREATE ROUTE
<!-- ************ -->
METHOD: POST
API: /pts/hospitalreg
SUCCESS: status:200, message: record found
FAILED:    status:400, message: record not found
<!-- *************************************************** -->

FINDBYONE
<!-- ******************** -->
METHOD: GET
API: /pts/hosiptal/:one
SUCCESS: status: 200, message: The Hospital's detail is shown below
FAILED: status: 400, message: record not found

<!-- *************************************** -->

FINDALL
<!-- ***************************************** -->
METHOD: GET
API : /pts/allHospital
SUCCESS: status:200, message: List of all registered hospitals
FAILED: status: 400, message: Sorry an error has occured
<!-- ******************************************************************* -->

UPDATE
<!-- ********************* -->
METHOD: POST
API: /pts/edit/:hospitalNum
SUCCESS: status:200, message: Hospital successfully updated
FAILED: status: 400
<!-- ********************************************************************* -->

DELETE
<!-- ********************************** -->
METHOD: POST
API: /pts/deleteHospital
SUCCESS: status:200, message: Hospital's Account successfully deleted
FAILED: status: 400