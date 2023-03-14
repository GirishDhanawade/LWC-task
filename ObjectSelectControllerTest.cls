@isTest
public class ObjectSelectControllerTest {
    @isTest
    static void testGetObjects() {
        // Call the getObjects method
        Map<String, String> objects = ObjectSelectorController.getObjects();
        // Verify that the map contains the Account and Contact objects
        System.assertEquals(objects.get('Account'), 'Account');
        System.assertEquals(objects.get('Contact'), 'Contact');
    }
}
