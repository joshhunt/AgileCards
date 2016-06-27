//
//  Agile_CardsUITests.swift
//  Agile CardsUITests
//
//  Created by Josh Hunt on 30/05/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest
//import SimulatorStatusMagic

class Agile_CardsUITests: XCTestCase {

  override func setUp() {
    super.setUp()
    continueAfterFailure = false

    let app = XCUIApplication()
    app.launch()
    setupSnapshot(app)
  }

  override func tearDown() {
    super.tearDown()
  }
 
  func testScreenshots() {
    let app = XCUIApplication()

    app.otherElements["swiper"].swipeLeft()
    
    app.otherElements["swiper"].swipeLeft()
    snapshot("AppStore-1")
    
    app.otherElements["swiper"].swipeLeft()
    
    app.otherElements["swiper"].swipeLeft()
    snapshot("AppStore-2")

    app.otherElements["settings-button"].tap()
    snapshot("AppStore-3")
    
    app.tables.staticTexts["Planning poker"].tap()
    app.tables.buttons["Green"].tap()
    app.otherElements["root-view"]
      .childrenMatchingType(.Other).elementBoundByIndex(0)
      .childrenMatchingType(.Other).elementBoundByIndex(0)
      .childrenMatchingType(.Other).elementBoundByIndex(0)
      .tap() // close settings
    
    app.otherElements["settings-button"].tap()
    app.tables.staticTexts["T-Shirt Sizing"].tap()
    app.tables.buttons["Purple"].tap()
    app.otherElements["root-view"]
      .childrenMatchingType(.Other).elementBoundByIndex(0)
      .childrenMatchingType(.Other).elementBoundByIndex(0)
      .childrenMatchingType(.Other).elementBoundByIndex(0)
      .tap() // close settings

    
    app.otherElements["swiper"].swipeLeft()
//    snapshot("13")
    
    app.otherElements["swiper"].swipeLeft()
    snapshot("AppStore-4")
    
    app.otherElements["swiper"].swipeLeft()
//    snapshot("15")
    
    app.otherElements["swiper"].swipeLeft()
    snapshot("AppStore-5")
  }

}
