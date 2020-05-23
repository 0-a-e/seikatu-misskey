package main

import (
	"net/http"
	"time"

	"github.com/p1ass/seikatsu-syukan-midare/handler"
	"github.com/p1ass/seikatsu-syukan-midare/lib/logging"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/memstore"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
)

// NewRouter returns a gin router
func NewRouter(twiHandler *handler.Handler, allowOrigin string) (*gin.Engine, error) {
	r := gin.New()

	r.Use(gin.Recovery())

	logger := logging.New()
	r.Use(ginzap.Ginzap(logger, time.RFC3339, true))
	r.Use(ginzap.RecoveryWithZap(logger, true))

	store := memstore.NewStore([]byte("secret"))
	r.Use(sessions.Sessions("session-store", store))
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{allowOrigin},
		AllowMethods:     []string{"POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Cookie", "Content-Type", "Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	r.GET("/login", twiHandler.StartSignInWithTwitter)
	r.GET("/callback", twiHandler.TwitterCallback)

	withAuthGrp := r.Group("/")
	withAuthGrp.Use(handler.AuthMiddleware())
	withAuthGrp.GET("/me", twiHandler.GetMe)

	return r, nil
}
