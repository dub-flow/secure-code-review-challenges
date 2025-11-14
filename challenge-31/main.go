package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

// Assume this to be a fully-grown database
var creds = map[string]string{} // username -> password

func currentUser(c *fiber.Ctx) string { return c.Cookies("user") }

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Type("html").SendString(
			`<h1>Home</h1><p><a href="/login">login</a> | <a href="/register">register</a> | <a href="/me">profile</a></p>`)
	})

	app.All("/register", func(c *fiber.Ctx) error {
		if c.Method() == fiber.MethodPost {
			u, p := c.FormValue("u"), c.FormValue("p")
			if u == "" || p == "" {
				return c.Status(fiber.StatusBadRequest).SendString("missing username or password")
			}
			if _, ok := creds[u]; ok {
				return c.Status(fiber.StatusBadRequest).SendString("user already exists")
			}
			creds[u] = p
			c.Cookie(&fiber.Cookie{Name: "user", Value: u, Path: "/"})
			return c.Redirect("/me")
		}
		return c.Type("html").SendString(
			`<h1>Register</h1><form method="POST">User:<input name="u"> Pass:<input type="password" name="p"><button>Register</button></form>`)
	})

	// Assume the session mechanism to be implemented correctly, not just a ("user=dub-flow" cookie)
	app.All("/login", func(c *fiber.Ctx) error {
		if c.Method() == fiber.MethodPost {
			u, p := c.FormValue("u"), c.FormValue("p")
			if creds[u] == p {
				c.Cookie(&fiber.Cookie{Name: "user", Value: u, Path: "/"})
				return c.Redirect("/me")
			}
			return c.Status(fiber.StatusUnauthorized).SendString("invalid credentials")
		}
		return c.Type("html").SendString(
			`<h1>Login</h1><form method="POST">User:<input name="u"> Pass:<input type="password" name="p"><button>Login</button></form>`)
	})

	app.All("/me*", func(c *fiber.Ctx) error {
		u := currentUser(c)
		if u == "" {
			return c.Redirect("/login")
		}

		return c.Type("html").SendString(fmt.Sprintf(`<h1>Welcome, %s</h1>`, u))
	})

	app.Listen(":5000")
}
