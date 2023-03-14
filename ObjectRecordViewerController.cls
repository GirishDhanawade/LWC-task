//this is simple Apex class that retreives records of perticular object
public with sharing class ObjectRecordViewerController {
//AuraEnabled means this method can be called from an Aura component and can be cached on the client side
    @AuraEnabled(cacheable=true)
//getRecords method contains two parameters -- objectApiName & fields
    public static List<SObject> getRecords(String objectApiName, List<String> fields) {
//The method then joins the field API names together into a comma-separated string
        String fieldApiNames = String.join(fields, ',');
//constructing a SOQL query string by concatenating the API names of the fields and the API name of the object that was passed as parameters
        return Database.query('SELECT ' + fieldApiNames + ' FROM ' + objectApiName);
    }
}