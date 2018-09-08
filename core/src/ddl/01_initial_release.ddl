create_namespace 'health'
create 'health:people', 'f1','pic', {NUMREGIONS => 15, SPLITALGO => 'HexStringSplit'}

# put the admin user in
put 'health:people', '1', 'f1:id', '1'
put 'health:people', '1', 'f1:name', 'David Levy'
put 'health:people', '1', 'f1:email', 'dlevy@cloudera.com'
put 'health:people', '1', 'f1:dateOfBirth','1900-01-01'
put 'health:people', '1', 'f1:gender','MALE'
put 'health:people', '1', 'f1:admin','true'

create 'health:hospital', 'f1','pic'
create 'health:hospital_floor', 'f1'
create 'health:hospital_floor_room', 'f1'
create 'health:hospital_floor_room_bed', 'f1'

# Create a hospital
put 'health:hospital', 'aaa', 'f1:id', 'aaa'
put 'health:hospital', 'aaa', 'f1:name', 'Antarctic Childrens Hospital'
put 'health:hospital', 'aaa', 'f1:address1', '1 south pole'


put 'health:hospital_floor', 'aaa_0', 'f1:id', '0'
put 'health:hospital_floor', 'aaa_0', 'f1:name', 'Ground'
put 'health:hospital_floor', 'aaa_0', 'f1:hospitalId', 'aaa'
put 'health:hospital_floor', 'aaa_0', 'f1:corners', '[{1317,39},{1431,493},{831,652},{606,795},{593,1249},{61,1239},{67,738},{170,480},{294,362},{482,260},{592,221},{1317,39}]'









