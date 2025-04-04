/**
 * Entry to project. Calls method that controls CLI logic
 */
public class Main {
    public static void main(String[] args) {

        //creates LMS object
        DriverManager driverManager = new DriverManager();
        //calls LMS method to start user interaction
        driverManager.menu();
    }
}