create_namespace 'health'
create 'health:people', 'f1','pic', {NUMREGIONS => 15, SPLITALGO => 'HexStringSplit'}

# put the admin user in
put 'health:people', '1', 'f1:id', '1'
put 'health:people', '1', 'f1:name', 'David Levy'
put 'health:people', '1', 'f1:email', 'dlevy@cloudera.com'
put 'health:people', '1', 'f1:dateOfBirth','1900-01-01'
put 'health:people', '1', 'f1:gender','MALE'
put 'health:people', '1', 'f1:admin','true'


