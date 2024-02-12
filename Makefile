#######################################
# Сахар с UI индикациией процессов = ))
#######################################

include .env
$(eval dev:;@:)

ITALICS_FONT=\033[3m
RED_BACKGROUND=\033[41m
GREEN_COLOR=\033[92m
END_STYLE=\033[0m

# Запуск приложения (с полной сборкой по умолчанию в --detach режиме)
# make run dev отключает --detach (для тестирования)
run:
	@printf '\n%8s \xF0\x9F\x9A\x80 Запуск приложения... \n\n'
	@printf '%8s \xF0\x9F\x94\xA7 Собираю образ... \n\n'
ifeq (dev, $(filter dev, $(MAKECMDGOALS)))
	@printf '%8s \xF0\x9F\x91\x80 Включен режим просмотра логов \n\n'
	@docker compose up --build
else
	@docker compose up --build -d
	@printf '\n%8s \xF0\x9F\x94\x97 (ctrl + click): http://localhost:${APP_PORT} \n'
	@printf '\n%7s ${GREEN_COLOR} \xE2\x9C\x94 Готово! ${END_STYLE} \n\n'
endif

# Остановка приложения (с удалением всех контейнеров и образов)
stop:
	@printf '\n%8s \xF0\x9F\x93\xA6 Удаляем образа и контейнеры... \n\n'
	@docker compose down --rmi all --volumes
	@printf '\n%7s ${GREEN_COLOR} \xE2\x9C\x94 Готово! ${END_STYLE} \n\n'