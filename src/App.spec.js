import { mount } from "@vue/test-utils"
import App from "./App"

describe("App", () => {
  test("é uma instancia Vue", () => {
    const wrapper = mount(App)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})