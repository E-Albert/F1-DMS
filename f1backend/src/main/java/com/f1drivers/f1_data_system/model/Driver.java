package com.f1drivers.f1_data_system.model;
/*this class holds all the attributes for each driver, methods to retrieve and set
    driver attributes and a constructor to initialize driver information*/

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

/**
 * Driver attributes and methods
 */
@Entity
public class Driver {

    @Id
    @GeneratedValue
    //driver attributes
    private Long id;
    private String driverName;
    private int driverNumber;
    private String currentTeam;
    private int age;
    private String nationality;
    private int numberOfRaces;
    private int numberOfWins;
    private boolean isActiveDriver;
    private float height;
    private double careerPoints;

    /**
     * gives values to driver attributes
     * @param driverName
     * @param driverNumber
     * @param currentTeam
     * @param age
     * @param nationality
     * @param numberOfRaces
     * @param numberOfWins
     * @param isActiveDriver
     * @param height
     * @param careerPoints
     */
    //constructor to initializes driver attributes
    public Driver(String driverName, int driverNumber, String currentTeam, int age,
                  String nationality, int numberOfRaces, int numberOfWins, boolean isActiveDriver, float height, double careerPoints) {
        this.driverName = driverName;
        this.driverNumber = driverNumber;
        this.currentTeam = currentTeam;
        this.age = age;
        this.nationality = nationality;
        this.numberOfRaces = numberOfRaces;
        this.numberOfWins = numberOfWins;
        this.isActiveDriver = isActiveDriver;
        this.height = height;
        this.careerPoints = careerPoints;
    }

    public Driver() {

    }

    //getter methods

    /**
     * retrieves driver name
     * @return
     */
    public String getDriverName() {
        return driverName;
    }

    /**
     * retrieves driver number
     * @return
     */
    public int getDriverNumber() {
        return driverNumber;
    }

    /**
     * retrieves driver team
     * @return
     */
    public String getCurrentTeam() {
        return currentTeam;
    }

    /**
     * retrieves driver age
     * @return
     */
    public int getAge() {
        return age;
    }

    /**
     * retrieves driver nationality
     * @return
     */
    public String getNationality() {
        return nationality;
    }

    /**
     * retrieves total races driver
     * @return
     */
    public int getNumberOfRaces() {
        return numberOfRaces;
    }

    /**
     * retrieves total races won
     * @return
     */
    public int getNumberOfWins() {
        return numberOfWins;
    }

    /**
     * retrieves if driver is active
     * @return
     */
    public boolean getIsActiveDriver() {
        return isActiveDriver;
    }

    /**
     * retrieves height of driver
     * @return
     */
    public float getHeight() {
        return height;
    }

    /**
     * retrieves career points
     * @return
     */
    public double getCareerPoints() {
        return careerPoints;
    }

    //setters

    /**
     * sets driver name
     * @param driverName
     */
    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    /**
     * sets driver number
     * @param driverNumber
     */
    public void setDriverNumber(int driverNumber) {
        this.driverNumber = driverNumber;
    }

    /**
     * sets driver team
     * @param currentTeam
     */
    public void setCurrentTeam(String currentTeam) {
        this.currentTeam = currentTeam;
    }

    /**
     * sets driver age
     * @param age
     */
    public void setAge(int age) {
        this.age = age;
    }

    /**
     * sets driver nationality
     * @param nationality
     */
    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    /**
     * sets number of total races
     * @param numberOfRaces
     */
    public void setNumberOfRaces(int numberOfRaces) {
        this.numberOfRaces = numberOfRaces;
    }

    /**
     * sets number of driver wins
     * @param numberOfWins
     */
    public void setNumberOfWins(int numberOfWins) {
        this.numberOfWins = numberOfWins;
    }

    /**
     * sets if driver is active
     * @param isActiveDriver
     */
    public void setIsActiveDriver(boolean isActiveDriver) {
        this.isActiveDriver = isActiveDriver;
    }

    /**
     * sets height of driver
     * @param height
     */
    public void setHeight(float height) {
        this.height = height;
    }

    /**
     * sets driver career points
     * @param careerPoints
     */
    public void setCareerPoints(double careerPoints) {
        this.careerPoints = careerPoints;
    }
}

