//exception that handles wrong file name errors. Prevents system from crashing
import java.io.FileNotFoundException;
//allows files to be read
import java.io.File;
//a dynamic array
import java.util.ArrayList;
//an interface used to maintain order of elements
import java.util.List;
//used to compare objects
import java.util.Objects;
//used to read user input
import java.util.Scanner;

/**
 * Has CLI logic
 */
public class DriverManager {
    //stores all driver objects in a list
    private List<Driver> drivers;

    //constructor to initialize list

    /**
     * creates driver list
     */
    public DriverManager() {
        drivers = new ArrayList<>();
    }

    /**
     * adds a driver to list
     * @param driver
     * @return
     */
    // Method to add driver to list, now returns boolean
    public boolean addDriver(Driver driver) {
        boolean isAdded = drivers.add(driver);
        if (isAdded) {
            System.out.println("Successfully added driver.");
        }
        return isAdded;
    }

    /**
     * removes driver from list
     * @param driverName
     * @return
     */
    // Method to remove a driver by name from list, now returns boolean
    public boolean removeDriver(String driverName) {
        for (Driver driver : drivers) {
            if (Objects.equals(driver.getDriverName(), driverName)) {
                drivers.remove(driver);
                System.out.println("Successfully removed driver.");
                return true;
            }
        }
        System.out.println("Driver not found.");
        return false;
    }

    /**
     * displays all drivers in list
     * @return
     */
    // Method to display all drivers from list, returns nothing, as this is for display purposes
    public boolean displayAllDrivers() {
        if (drivers.isEmpty()) {
            System.out.println("No drivers available to display.");
            return false;
        } else {
            for (Driver driver : drivers) {
                System.out.println(driver.getDriverName() + "-" + driver.getDriverNumber() + "-" + driver.getCurrentTeam() + "-" + driver.getAge() + "-" + driver.getNationality() + "-" + driver.getNumberOfRaces() + "-" + driver.getNumberOfWins() + "-" + driver.getIsActiveDriver() + "-" + driver.getHeight() + "-" + driver.getCareerPoints() + "\n");
            }
            return true;
        }
    }

    /**
     * loads driver information from file
     * @param filename
     * @return
     */
    // Method to load information from a file and add drivers to F1 DMS, now returns boolean
    public boolean loadDriversFromFile(String filename) {
        try {
            Scanner fileScanner = new Scanner(new File(filename));
            while (fileScanner.hasNextLine()) {
                String line = fileScanner.nextLine();
                String[] details = line.split("-");
                if (details.length == 10) {
                    String driverName = details[0].trim();
                    int driverNumber = Integer.parseInt(details[1].trim());
                    String currentTeam = details[2].trim();
                    int age = Integer.parseInt(details[3].trim());
                    String nationality = details[4].trim();
                    int numberOfRaces = Integer.parseInt(details[5].trim());
                    int numberOfWins = Integer.parseInt(details[6].trim());
                    boolean isActiveDriver = Boolean.parseBoolean(details[7].trim());
                    float height = Float.parseFloat(details[8].trim());
                    double careerPoints = Double.parseDouble(details[9].trim());

                    addDriver(new Driver(driverName, driverNumber, currentTeam, age, nationality, numberOfRaces, numberOfWins, isActiveDriver, height, careerPoints));
                } else {
                    System.out.println("Invalid data format in line: " + line);
                }
            }
            fileScanner.close();
            System.out.println("Drivers successfully loaded from file.");
            return true;
        } catch (FileNotFoundException e) {
            System.out.println("Error: File not found.");
        } catch (Exception e) {
            System.out.println("Error processing the file: " + e.getMessage());
        }
        return false;
    }

    /**
     * updates driver information
     * @param driverName
     * @param updatedDriver
     * @return
     */
    public boolean updateDriver(String driverName, Driver updatedDriver) {
        for (Driver driver : drivers) {
            if (Objects.equals(driver.getDriverName(), driverName)) {
                // Updating the driver with the details from updatedDriver
                driver.setDriverNumber(updatedDriver.getDriverNumber());
                driver.setCurrentTeam(updatedDriver.getCurrentTeam());
                driver.setAge(updatedDriver.getAge());
                driver.setNationality(updatedDriver.getNationality());
                driver.setNumberOfRaces(updatedDriver.getNumberOfRaces());
                driver.setNumberOfWins(updatedDriver.getNumberOfWins());
                driver.setIsActiveDriver(updatedDriver.getIsActiveDriver());
                driver.setHeight(updatedDriver.getHeight());
                driver.setCareerPoints(updatedDriver.getCareerPoints());

                System.out.println("Driver information updated successfully.");
                return true;
            }
        }
        System.out.println("Driver not found.");
        return false;
    }

    /**
     * calculates driver win ratio
     * @param driverName
     * @return
     */
    // Custom method that calculates win-to-race ratio for given driver, now returns boolean
    public boolean calculateWinRatio(String driverName) {
        for (Driver driver : drivers) {
            if (Objects.equals(driver.getDriverName(), driverName)) {
                if (driver.getNumberOfRaces() > 0) {
                    double ratio = (double) driver.getNumberOfWins() / driver.getNumberOfRaces();
                    System.out.println("Win-to-Race Ratio: " + String.format("%.2f", ratio) + "%");
                    return true;
                } else {
                    System.out.println("No races completed yet.");
                    return false;
                }
            }
        }
        System.out.println("Driver not found.");
        return false;
    }

    /**
     * CLI logic
     */
    //method for user interaction with DMS
    public void menu() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            //displays options to user
            System.out.println("Select a number to continue.");
            System.out.println("1. Add Driver");
            System.out.println("2. Remove Driver");
            System.out.println("3. Display All Drivers");
            System.out.println("4. Load Drivers from File");
            System.out.println("5. Update Driver Information");
            System.out.println("6. Calculate Win-to-Race Ratio");
            System.out.println("7. Exit");

            //get user input
            int choice = getIntInput(scanner, "Enter your choice: ");

            //action executed based on user selection
            switch (choice) {
                case 1:
                    //gathering driver details so that a new driver object can be created and stored in list
                    String driverName = getStringInput(scanner, "Enter Driver Name: ");
                    int driverNumber = getIntInput(scanner, "Enter Driver Number: ");
                    String currentTeam = getStringInput(scanner, "Enter Current Team: ");
                    int age = getIntInput(scanner, "Enter Age: ");
                    String nationality = getStringInput(scanner, "Enter Nationality: ");
                    int numberOfRaces = getIntInput(scanner, "Enter Number of Races: ");
                    int numberOfWins = getIntInput(scanner, "Enter Number of Wins: ");
                    boolean isActiveDriver = getBooleanInput(scanner, "Is the driver Active? (true or false): ");
                    float height = getFloatInput(scanner, "Enter Height(m): ");
                    double careerPoints = getDoubleInput(scanner, "Enter Career Points: ");

                    //the driver is created and added to list
                    addDriver(new Driver(driverName, driverNumber, currentTeam, age, nationality, numberOfRaces, numberOfWins, isActiveDriver, height, careerPoints));
                    break;

                case 2:
                    //getting name of driver to remove
                    String removeName = getStringInput(scanner, "Enter driver name to remove (case sensitive): ");
                    removeDriver(removeName);
                    break;

                case 3:
                    //shows all drivers
                    displayAllDrivers();
                    break;

                case 4:
                    //getting filename from user to load driver data from file
                    System.out.print("Enter filename to load drivers (absolute path): ");
                    String filename = scanner.nextLine();
                    loadDriversFromFile(filename);
                    break;

                case 5:
                    // Get the driver name to update
                    String updateDriverName = getStringInput(scanner, "Enter driver name to update (case sensitive): ");

                    // Find the driver in the list
                    Driver existingDriver = null;
                    for (Driver driver : drivers) {
                        if (driver.getDriverName().equals(updateDriverName)) {
                            existingDriver = driver;
                            break;
                        }
                    }

                    if (existingDriver != null) {
                        // Driver exists, so gather updated details
                        int updatedDriverNumber = getIntInput(scanner, "Enter new Driver Number: ");
                        String updatedCurrentTeam = getStringInput(scanner, "Enter new Current Team: ");
                        int updatedAge = getIntInput(scanner, "Enter new Age: ");
                        String updatedNationality = getStringInput(scanner, "Enter new Nationality: ");
                        int updatedNumberOfRaces = getIntInput(scanner, "Enter new Number of Races: ");
                        int updatedNumberOfWins = getIntInput(scanner, "Enter new Number of Wins: ");
                        boolean updatedIsActiveDriver = getBooleanInput(scanner, "Is the driver Active? (true or false): ");
                        float updatedHeight = getFloatInput(scanner, "Enter new Height(m): ");
                        double updatedCareerPoints = getDoubleInput(scanner, "Enter new Career Points: ");

                        // Create updated driver object
                        Driver updatedDriver = new Driver(updateDriverName, updatedDriverNumber, updatedCurrentTeam, updatedAge, updatedNationality, updatedNumberOfRaces, updatedNumberOfWins, updatedIsActiveDriver, updatedHeight, updatedCareerPoints);

                        // Call updateDriver method
                        updateDriver(updateDriverName, updatedDriver);
                    } else {
                        // If driver is not found, print a message and do not ask for input
                        System.out.println("Driver not found. No updates made.");
                    }
                    break;
                case 6:
                    calculateWinRatio(getStringInput(scanner, "Enter driver name to calculate win ratio (case sensitive): "));
                    break;
                case 7:
                    System.out.println("Exiting...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }

    // Validation Methods

    /**
     * checks if user input is a string
     * @param scanner
     * @param message
     * @return
     */
    //this method ensures that the input only contains letters. Uses a regex to help with validation
    private String getStringInput(Scanner scanner, String message) {
        while (true) {
            System.out.print(message);
            String input = scanner.nextLine().trim();
            if (input.matches("[a-zA-Z ]+")) {
                return input;
            }
            System.out.println("Invalid input. Please enter only letters.");
        }
    }

    /**
     * checks if user input is an integer
     * @param scanner
     * @param message
     * @return
     */
    //this method ensures that the input only contains integers
    private int getIntInput(Scanner scanner, String message) {
        while (true) {
            System.out.print(message);
            if (scanner.hasNextInt()) {
                int value = scanner.nextInt();
                scanner.nextLine();
                return value;
            } else {
                System.out.println("Invalid input. Please enter a valid integer.");
                scanner.next();
            }
        }
    }

    /**
     * checks if user input is a boolean
     * @param scanner
     * @param message
     * @return
     */
    //this method ensures that the input only accepts the words true or false
    private boolean getBooleanInput(Scanner scanner, String message) {
        while (true) {
            System.out.print(message);
            String input = scanner.nextLine().trim().toLowerCase();
            if (input.equals("true") || input.equals("false")) {
                return Boolean.parseBoolean(input);
            }
            System.out.println("Invalid input. Please enter 'true' or 'false'.");
        }
    }

    /**
     * checks if user input is a float
     * @param scanner
     * @param message
     * @return
     */
    //this method ensures that the input is a float
    private float getFloatInput(Scanner scanner, String message) {
        while (true) {
            System.out.print(message);
            if (scanner.hasNextFloat()) {
                float value = scanner.nextFloat();
                scanner.nextLine();
                return value;
            } else {
                System.out.println("Invalid input. Please enter a valid float.");
                scanner.next();
            }
        }
    }

    /**
     * checks if user input is a double
     * @param scanner
     * @param message
     * @return
     */
    //this method ensures that the input is a double
    private double getDoubleInput(Scanner scanner, String message) {
        while (true) {
            System.out.print(message);
            if (scanner.hasNextDouble()) {
                double value = scanner.nextDouble();
                scanner.nextLine();
                return value;
            } else {
                System.out.println("Invalid input. Please enter a valid double.");
                scanner.next();
            }
        }
    }

}
