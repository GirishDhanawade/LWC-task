@isTest
public class ObjectRecordViewerControllerTest {
    @isTest
    static void testGetRecords() {
        // Create and insert a new Account record
        Account acc = new Account(Name='Test Account');
        insert acc;
        // Call the getRecords method with the Account object name and fields to query
        List<SObject> records = ObjectRecordViewerController.getRecords('Account', new List<String>{'Name'});
        // Verify that the returned list contains the inserted account record and its name field
        System.assertEquals(1, records.size());
        Account returnedAcc = (Account)records[0];
        System.assertEquals(returnedAcc.Name, 'Test Account');
    }
}
