FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Hotel.Orbital.sln", "Hotel.Orbital.sln"]
COPY ["src/Hotel.Orbital.Infrastructure/Hotel.Orbital.Infrastructure.csproj", "src/Hotel.Orbital.Infrastructure/"]
COPY ["src/Hotel.Orbital.Core/Hotel.Orbital.Core.csproj", "src/Hotel.Orbital.Core/"]
COPY ["src/Hotel.Orbital.Entities/Hotel.Orbital.Entities.csproj", "src/Hotel.Orbital.Entities/"]
COPY ["src/Hotel.Orbital.Api/Hotel.Orbital.Api.csproj", "src/Hotel.Orbital.Api/"]
COPY ["src/Hotel.Orbital.EmailSender/Hotel.Orbital.EmailSender.csproj", "src/Hotel.Orbital.EmailSender/"]
COPY ["src/Hotel.Orbital.BnovoIntegration/Hotel.Orbital.BnovoIntegration.csproj", "src/Hotel.Orbital.BnovoIntegration/"]
COPY ["src/Hotel.Orbital.WebDavImageService/Hotel.Orbital.WebDavImageService.csproj", "src/Hotel.Orbital.WebDavImageService/"]
COPY ["src/Hotel.Orbital.Tests/Hotel.Orbital.Tests.csproj", "src/Hotel.Orbital.Tests/"]
RUN dotnet restore "Hotel.Orbital.sln"
COPY . .
WORKDIR "src/Hotel.Orbital.Api"
RUN dotnet build "Hotel.Orbital.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Hotel.Orbital.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS http://*:80
EXPOSE 80
ENTRYPOINT ["dotnet", "Hotel.Orbital.Api.dll"]
