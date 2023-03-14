@isTest
private class ObjectFormControllerTest {
   @isTest
    static void testGetObjects() {
        // Call the getObjects method
        Map<String, String> objects = ObjectFormController.getObjects();
        // Verify that the map contains the Account and Contact objects
        System.assertEquals(objects.get('Account'), 'Account');
        System.assertEquals(objects.get('Contact'), 'Contact');
    }
    @isTest
    static void testGetFields() {
        // Create a new account object
        Account acc = new Account(Name='Test Account');
        insert acc;
        // Call the getFields method with the account object name
        Map<String, String> fields = ObjectFormController.getFields('Account');
        // Verify that the returned map contains the account name field
        System.assertEquals(fields.get('Name'), 'Name');
    }
    @isTest
    static void testGetRecords() {
        // Create and insert a new Account record
        Account acc = new Account(Name='Test Account');
        insert acc;
        // Call the getRecords method with the Account object name and fields to query
        List<SObject> records = ObjectFormController.getRecords('Account', new List<String>{'Name'});
        // Verify that the returned list contains the inserted account record and its name field
        System.assertEquals(1, records.size());
        Account returnedAcc = (Account)records[0];
        System.assertEquals(returnedAcc.Name, 'Test Account');
    }
    @isTest
    static void testDeleteRecords() {
        // Create a test account object
        Account testAccount = new Account(Name='Test Account');
        insert testAccount;    
        // Call the deleteRecords method
        Test.startTest();
        ObjectFormController.deleteRecords(testAccount);
        Test.stopTest();   
        // Verify that the account object was deleted
        List<Account> accounts = [SELECT Id FROM Account WHERE Id = :testAccount.Id];
        System.assertEquals(0, accounts.size(), 'The test account object should have been deleted');
    }
}
