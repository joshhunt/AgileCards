//
//  Agile_CardsUITests.swift
//  Agile CardsUITests
//
//  Created by Josh Hunt on 30/05/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

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
  
  func testExample() {
    let app = XCUIApplication()
    let screens = "   8   1   2   3   5   8   1"

    
    app.otherElements[screens].childrenMatchingType(.Other).matchingIdentifier("  1").elementBoundByIndex(0).otherElements[" 1"].tap()
    snapshot("Launch1")
    
    app.otherElements[screens].otherElements[" 2"].tap()
    snapshot("Launch2")
    
    app.otherElements[screens].otherElements[" 3"].tap()
    snapshot("Launch3")
    
    app.otherElements[screens].otherElements[" 5"].tap()
    snapshot("Launch4")
    
    app.otherElements[screens].childrenMatchingType(.Other).matchingIdentifier("  8").elementBoundByIndex(0).otherElements[" 8"].tap()
    snapshot("Launch6")
    
  }
  
}
