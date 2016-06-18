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
  
  
  // snapshot("Launch1")
  func testExample() {
    
    let app = XCUIApplication()
    app.otherElements["   13   0   1   2   3   5   8   13   0"].childrenMatchingType(.Other).matchingIdentifier("  0").elementBoundByIndex(0).otherElements[" 0"].tap()
    
    app.otherElements["   13   0   1   2   3   5   8   13   0"].otherElements[" 1"].tap()
    snapshot("Launch1")
    app.otherElements["   13   0   1   2   3   5   8   13   0"].otherElements[" 2"].tap()
    
    app.otherElements["   13   0   1   2   3   5   8   13   0"].otherElements[" 3"].tap()
    snapshot("Launch2")
    app.otherElements["   13   0   1   2   3   5   8   13   0"].otherElements[" 5"].tap()
    snapshot("Launch3")
    app.otherElements["   13   0   1   2   3   5   8   13   0"].otherElements[" 8"].tap()
    snapshot("Launch4")
    app.otherElements["  "].tap()
    snapshot("Launch5")
    
    
    
  }
  
}
