@isTest
public class FeildSelectorControllerTest {
    @isTest
    static void testGetFields() {
        // Create a new account object
        Account acc = new Account(Name='Test Account');
        insert acc;
        // Call the getFields method with the account object name
        Map<String, String> fields = FieldSelectorController.getFields('Account');
        // Verify that the returned map contains the account name field
        System.assertEquals(fields.get('Name'), 'Name');
    }
}
