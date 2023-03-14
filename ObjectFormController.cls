public class ObjectFormController 
{
    //this is simple apex class method that retrieves objects from salesforce org
    //@AuraEnabled that it can be called from an Aura component in a Lightning app, and it can be cached on the client side    
        @AuraEnabled(cacheable=true)
    //creating an empty Map -- objmap to store the object API names and labels
        public static Map<String,String> getObjects()
         {
            Map<String, String> objmap = new Map<String, String>();
    //retrieves a Map of all available SObject types using the "Schema.getGlobalDescribe()" method
            for (Schema.SObjectType objNameType : Schema.getGlobalDescribe().values())
             {
                String name = objNameType.getDescribe().getLocalName();
                String label = objNameType.getDescribe().getLabel();
                objmap.put(name, label);
             }
            return objmap;
          }
    //this is simple Apex class method that retreives feilds of perticular object which we selected
    //AuraEnabled means this method can be called from an Aura component
        @AuraEnabled
        public static Map<String, String> getFields(String ObjectName) 
        {
    //The method creating a new empty map -- "fieldNamesMap" to store the field names and labels
            Map<String, String> fieldNamesMap = new Map<String, String>();
    // retrieves a Map of all available SObject types
            Map<String, Schema.SObjectType> fieldMap = Schema.getGlobalDescribe();
    //iterates over the list of fields for the specified object and retrieves the name and label for each field        
            for (Schema.SObjectField fields : fieldMap.get(ObjectName).getDescribe().fields.getMap().values())
            {
                fieldNamesMap.put(fields.getDescribe().getName(), fields.getDescribe().getName());
            }
            return fieldNamesMap;
        }
    //this is simple Apex class method that retreives records of perticular object
    //AuraEnabled means this method can be called from an Aura component and can be cached on the client side
    @AuraEnabled  
    //getRecords method contains two parameters -- objectApiName & fields
        public static List<SObject> getRecords(String objectApiName, List<String> fields) 
        {
    //The method then joins the field API names together into a comma-separated string
            String fieldApiNames = String.join(fields, ',');
    //constructing a SOQL query string by concatenating the API names of the fields and the API name of the object that was passed as parameters
            return Database.query('SELECT ' + fieldApiNames + ' FROM ' + objectApiName);
        } 
        @AuraEnabled
    public static void deleteRecords(sObject accountObject){
        try {
            delete accountObject;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}