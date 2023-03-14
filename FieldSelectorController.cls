//this is simple Apex class that retreives feilds of perticular object which we selected
public with sharing class FieldSelectorController {
//AuraEnabled means this method can be called from an Aura component
    @AuraEnabled
    public static Map<String, String> getFields(String ObjectName) {
//The method creating a new empty map -- "fieldNamesMap" to store the field names and labels
        Map<String, String> fieldNamesMap = new Map<String, String>();
// retrieves a Map of all available SObject types
        Map<String, Schema.SObjectType> fieldMap = Schema.getGlobalDescribe();
//iterates over the list of fields for the specified object and retrieves the name and label for each field        
        for (Schema.SObjectField fields : fieldMap.get(ObjectName).getDescribe().fields.getMap().values()) {
            fieldNamesMap.put(fields.getDescribe().getName(), fields.getDescribe().getName());
        }
        return fieldNamesMap;
    }
 
}