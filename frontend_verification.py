from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        try:
            print("Navigating to home...")
            page.goto("http://localhost:5000/home")
            page.wait_for_selector("text=Engineering Excellence", timeout=10000)
            print("Found English text.")

            print("Looking for language toggle...")
            # Find button in header with Globe icon
            # Selector: header button:has(svg.lucide-globe)
            # Or just any button with the globe icon

            toggle_btn = page.query_selector("header button:has(svg.lucide-globe)")

            if toggle_btn:
                print("Found globe icon button, clicking...")
                toggle_btn.click()
            else:
                print("Could not find globe icon button in header. Dumping buttons...")
                buttons = page.query_selector_all("header button")
                for i, btn in enumerate(buttons):
                    print(f"Button {i}: {btn.inner_html()}")
                    if "lucide-globe" in btn.inner_html():
                        print(f"Button {i} seems to have the globe. Clicking...")
                        btn.click()
                        break

            # Wait for Arabic text in Hero
            print("Waiting for Arabic text...")
            page.wait_for_selector("text=التميز الهندسي", timeout=10000)
            print("Found Arabic text.")

            # Take screenshot
            page.screenshot(path="verification_success.png")
            print("Screenshot saved to verification_success.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()