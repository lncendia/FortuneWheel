FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["FortuneWheel/FortuneWheel.csproj", "FortuneWheel/"]
COPY ["FortuneWheel.Infrastructure.Storage/FortuneWheel.Infrastructure.Storage.csproj", "FortuneWheel.Infrastructure.Storage/"]
COPY ["FortuneWheel.Application.Abstractions/FortuneWheel.Application.Abstractions.csproj", "FortuneWheel.Application.Abstractions/"]
COPY ["FortuneWheel.Application.Services/FortuneWheel.Application.Services.csproj", "FortuneWheel.Application.Services/"]
COPY ["FortuneWheel.Infrastructure.Web/FortuneWheel.Infrastructure.Web.csproj", "FortuneWheel.Infrastructure.Web/"]
RUN dotnet restore "FortuneWheel/FortuneWheel.csproj"
COPY . .

FROM node:23-alpine AS clientbuild
WORKDIR /src/fortune-wheel
COPY --from=build /src/FortuneWheel/fortune-wheel/package*.json ./
RUN npm install
COPY --from=build /src/FortuneWheel/fortune-wheel/. ./
RUN npm run build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
WORKDIR "/src/FortuneWheel"
COPY --from=clientbuild /src/wwwroot ./wwwroot
RUN dotnet publish "./FortuneWheel.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FortuneWheel.dll"]
