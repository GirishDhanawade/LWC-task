//this is simple apex class that retrieves objects from salesforce org
public with sharing class ObjectSelectorController {
//@AuraEnabled that it can be called from an Aura component in a Lightning app, and it can be cached on the client side    
    @AuraEnabled(cacheable=true)
//creating an empty Map -- objmap to store the object API names and labels
    public static Map<String,String> getObjects() {
        Map<String, String> objmap = new Map<String, String>();
//retrieves a Map of all available SObject types using the "Schema.getGlobalDescribe()" method
        for (Schema.SObjectType objNameType : Schema.getGlobalDescribe().values()) {
            String name = objNameType.getDescribe().getLocalName();
            String label = objNameType.getDescribe().getLabel();
            objmap.put(name, label);
        }
        return objmap;
    }

}
