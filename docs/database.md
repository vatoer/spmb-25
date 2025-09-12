# database

## run script

```sh
pnpm --filter=@workspace/database run db:push:spmb
```

## import data wilayah 

```sh
docker exec -i your_container_name psql -U postgres -d your_database < d:\fr\project\spmb\spmb-25\packages\database\wilayah.sql

docker exec -i spmb-postgres psql -U spmbuser -d spmb < d:\fr\project\spmb\spmb-25\packages\database\wilayah.sql
``

```ps
Get-Content 'd:\fr\project\spmb\spmb-25\packages\database\wilayah.sql' | docker exec -i spmb-postgres psql -U spmbuser -d spmb
```