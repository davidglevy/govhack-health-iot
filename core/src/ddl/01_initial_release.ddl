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
put 'health:hospital_floor', 'aaa_0', 'f1:corners', '[{x=1317,y=39},{x=1431,y=493},{x=831,y=652},{x=606,y=795},{x=593,y=1249},{x=61,y=1239},{x=67,y=738},{x=170,y=480},{x=294,y=362},{x=482,y=260},{x=592,y=221},{x=1317,y=39}]'









