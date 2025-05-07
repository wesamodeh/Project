import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  // Keep these alive for as long as the app runs:
  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    // 1️⃣ Create the delegate + factory
    let delegate = ReactNativeDelegate()
    delegate.dependencyProvider = RCTAppDependencyProvider()
    let factory = RCTReactNativeFactory(delegate: delegate)

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    // 2️⃣ Build your window and root‑view‑controller
    window = UIWindow(frame: UIScreen.main.bounds)
    let rootVC = UIViewController()

    // 3️⃣ Ask the factory’s rootViewFactory for an RCTRootView
    let initialProps: [String: Any] = ["customProp": "propValue"]
    let rnRootView = factory
      .rootViewFactory
      .view(
        withModuleName: "TestProject",
        initialProperties: initialProps
      )

    // 4️⃣ Wire it up
    rootVC.view = rnRootView
    window?.rootViewController = rootVC
    window?.makeKeyAndVisible()

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    bundleURL()
  }

  override func bundleURL() -> URL? {
    #if DEBUG
      RCTBundleURLProvider
        .sharedSettings()
        .jsBundleURL(
          forBundleRoot: "index",
          fallbackExtension: nil
        )
    #else
      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
